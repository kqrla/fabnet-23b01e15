import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/localnetwork/hooks/useSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import {
  PRINTER_TYPES, COMMON_MATERIALS, FULFILLMENT_OPTIONS, AVAILABILITY,
  NETWORK_CITIES,
} from '@/localnetwork/data/constants';

export default function JoinPage() {
  const navigate = useNavigate();
  const { session, loading: sessLoading } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    alias: '',
    city: NETWORK_CITIES[0].name,
    service_radius_km: 10,
    printer_type: 'FDM',
    machine_model: '',
    build_volume: '',
    materials: [] as string[],
    resolution: '',
    max_job_size: '',
    turnaround: '',
    availability: 'available' as (typeof AVAILABILITY)[number],
    fulfillment: ['pickup'] as string[],
    price_guidance: '',
    bio: '',
  });

  useEffect(() => {
    if (!session) return;
    supabase.from('maker_profiles').select('*').eq('user_id', session.user.id).maybeSingle()
      .then(({ data }) => {
        if (data) {
          setExistingId(data.id);
          setForm({
            alias: data.alias, city: data.city, service_radius_km: data.service_radius_km,
            printer_type: data.printer_type, machine_model: data.machine_model ?? '',
            build_volume: data.build_volume ?? '',
            materials: Array.isArray(data.materials) ? (data.materials as string[]) : [],
            resolution: data.resolution ?? '', max_job_size: data.max_job_size ?? '',
            turnaround: data.turnaround ?? '', availability: data.availability as any,
            fulfillment: Array.isArray(data.fulfillment) ? (data.fulfillment as string[]) : [],
            price_guidance: data.price_guidance ?? '', bio: data.bio ?? '',
          });
        }
      });
  }, [session]);

  if (sessLoading) return null;
  if (!session) {
    return (
      <Center>
        <p className="text-sm text-muted-foreground lowercase mb-3">you need an account to list your machine.</p>
        <Link to="/localnetwork/auth"><Button>create account</Button></Link>
      </Center>
    );
  }

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function toggleArray(field: 'materials' | 'fulfillment', val: string) {
    setForm(f => {
      const arr = f[field];
      return { ...f, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.alias.trim() || !form.printer_type) {
      toast.error('alias and printer type are required');
      return;
    }
    setSubmitting(true);
    const cityCfg = NETWORK_CITIES.find(c => c.name === form.city)!;
    const payload = {
      user_id: session!.user.id,
      alias: form.alias.trim().toLowerCase(),
      city: form.city,
      approx_lat: cityCfg.center[0],
      approx_lng: cityCfg.center[1],
      service_radius_km: form.service_radius_km,
      printer_type: form.printer_type,
      machine_model: form.machine_model || null,
      build_volume: form.build_volume || null,
      materials: form.materials,
      resolution: form.resolution || null,
      max_job_size: form.max_job_size || null,
      turnaround: form.turnaround || null,
      availability: form.availability,
      fulfillment: form.fulfillment,
      price_guidance: form.price_guidance || null,
      bio: form.bio || null,
    };
    const { error } = existingId
      ? await supabase.from('maker_profiles').update(payload).eq('id', existingId)
      : await supabase.from('maker_profiles').insert(payload);
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success(existingId ? 'profile updated — pending review for changes' : 'profile submitted — pending manual review');
    navigate('/localnetwork/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="px-6 py-4 border-b border-border/60 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Link to="/localnetwork" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={12} /> back to map
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">localnetwork / join</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-8 pb-20">
        <h1 className="text-2xl font-bold text-foreground lowercase">{existingId ? 'edit your maker profile' : 'list your machine'}</h1>
        <p className="text-sm text-muted-foreground mt-1.5 lowercase leading-relaxed">
          your profile is private until manually reviewed. exact addresses are never shown — only an approximate city center and service radius.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-7">
          <Section title="identity">
            <Field label="alias / display name">
              <Input value={form.alias} onChange={e => update('alias', e.target.value)} placeholder="e.g. mission_maker" />
            </Field>
            <Field label="bio">
              <Textarea rows={2} value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="one line about your shop." />
            </Field>
          </Section>

          <Section title="location">
            <Field label="city">
              <select value={form.city} onChange={e => update('city', e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                {NETWORK_CITIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </Field>
            <Field label={`service radius — ${form.service_radius_km} km`}>
              <input type="range" min={2} max={40} value={form.service_radius_km}
                onChange={e => update('service_radius_km', Number(e.target.value))}
                className="w-full accent-foreground" />
            </Field>
          </Section>

          <Section title="machine">
            <Field label="printer type">
              <div className="flex flex-wrap gap-1.5">
                {PRINTER_TYPES.map(t => (
                  <button type="button" key={t} onClick={() => update('printer_type', t)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      form.printer_type === t ? 'bg-foreground text-background border-foreground' : 'bg-muted text-foreground/70 border-transparent hover:border-foreground/30'
                    }`}>{t}</button>
                ))}
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="machine model"><Input value={form.machine_model} onChange={e => update('machine_model', e.target.value)} placeholder="bambu x1c" /></Field>
              <Field label="build volume"><Input value={form.build_volume} onChange={e => update('build_volume', e.target.value)} placeholder="256×256×256mm" /></Field>
              <Field label="resolution / nozzle"><Input value={form.resolution} onChange={e => update('resolution', e.target.value)} placeholder="0.4mm" /></Field>
              <Field label="max job size"><Input value={form.max_job_size} onChange={e => update('max_job_size', e.target.value)} placeholder="up to 250mm" /></Field>
            </div>
            <Field label="materials">
              <div className="flex flex-wrap gap-1.5">
                {COMMON_MATERIALS.map(m => {
                  const on = form.materials.includes(m);
                  return (
                    <button type="button" key={m} onClick={() => toggleArray('materials', m)}
                      className={`text-[10px] font-mono px-2 py-1 rounded-full border transition-colors ${
                        on ? 'bg-foreground text-background border-foreground' : 'bg-muted text-foreground/70 border-transparent hover:border-foreground/30'
                      }`}>{m}</button>
                  );
                })}
              </div>
            </Field>
          </Section>

          <Section title="logistics">
            <Field label="turnaround">
              <Input value={form.turnaround} onChange={e => update('turnaround', e.target.value)} placeholder="1-3 days, same-day capable, etc." />
            </Field>
            <Field label="availability">
              <div className="flex gap-1.5">
                {AVAILABILITY.map(a => (
                  <button type="button" key={a} onClick={() => update('availability', a)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors lowercase ${
                      form.availability === a ? 'bg-foreground text-background border-foreground' : 'bg-muted text-foreground/70 border-transparent hover:border-foreground/30'
                    }`}>{a}</button>
                ))}
              </div>
            </Field>
            <Field label="fulfillment">
              <div className="flex gap-1.5">
                {FULFILLMENT_OPTIONS.map(f => {
                  const on = form.fulfillment.includes(f);
                  return (
                    <button type="button" key={f} onClick={() => toggleArray('fulfillment', f)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors lowercase ${
                        on ? 'bg-foreground text-background border-foreground' : 'bg-muted text-foreground/70 border-transparent hover:border-foreground/30'
                      }`}>{f}</button>
                  );
                })}
              </div>
            </Field>
            <Field label="price guidance (optional)">
              <Input value={form.price_guidance} onChange={e => update('price_guidance', e.target.value)} placeholder="$0.15/g, quote per part, etc." />
            </Field>
          </Section>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-3">
            <p className="text-[10px] text-muted-foreground lowercase">
              by submitting you agree to fulfill jobs honestly. exact address is never shown.
            </p>
            <Button type="submit" disabled={submitting} className="flex-shrink-0">
              {submitting ? '…' : existingId ? <><Check size={13} className="mr-1" /> save changes</> : 'submit for review'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/60 pb-1.5">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground lowercase block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">{children}</div>;
}