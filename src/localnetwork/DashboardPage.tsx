import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/localnetwork/hooks/useSession';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { ArrowLeft, Pencil, LogOut, Shield, Clock } from 'lucide-react';
import type { MakerProfile, FabRequest } from '@/localnetwork/data/types';
import { AVAILABILITY } from '@/localnetwork/data/constants';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [profile, setProfile] = useState<MakerProfile | null>(null);
  const [open, setOpen] = useState<FabRequest[]>([]);
  const [matched, setMatched] = useState<FabRequest[]>([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!session) return;
    supabase.from('maker_profiles').select('*').eq('user_id', session.user.id).maybeSingle()
      .then(({ data }) => setProfile(data as any));
  }, [session]);

  useEffect(() => {
    if (!profile) return;
    supabase.from('fab_requests').select('*').eq('city', profile.city).eq('status', 'open')
      .order('created_at', { ascending: false })
      .then(({ data }) => setOpen((data ?? []) as any));
    supabase.from('fab_requests').select('*').eq('matched_maker_id', profile.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setMatched((data ?? []) as any));
  }, [profile]);

  async function setAvailability(a: string) {
    if (!profile) return;
    setUpdating(true);
    const { error } = await supabase.from('maker_profiles').update({ availability: a }).eq('id', profile.id);
    setUpdating(false);
    if (error) toast.error(error.message);
    else { setProfile({ ...profile, availability: a as any }); toast.success(`status: ${a}`); }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate('/localnetwork');
  }

  if (loading) return null;
  if (!session) {
    return (
      <Center>
        <p className="text-sm text-muted-foreground lowercase mb-3">sign in to view your dashboard.</p>
        <Link to="/localnetwork/auth"><Button>sign in</Button></Link>
      </Center>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSignOut={signOut} />
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <h1 className="text-xl font-bold text-foreground lowercase">no maker profile yet</h1>
          <p className="text-sm text-muted-foreground mt-2 lowercase">list your machine to start receiving routed jobs.</p>
          <Link to="/localnetwork/join" className="inline-block mt-5"><Button>create profile</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Header onSignOut={signOut} />

      <div className="max-w-4xl mx-auto px-6 py-8 pb-20">
        {/* Profile summary */}
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-bold text-foreground lowercase">{profile.alias}</h1>
                {profile.verified && <Shield size={13} className="text-foreground/60" />}
                {!profile.approved && (
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-500/15 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">pending review</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 lowercase">{profile.printer_type} · {profile.city} · {profile.service_radius_km}km radius</p>
            </div>
            <Link to="/localnetwork/join">
              <Button variant="outline" size="sm" className="text-[10px] uppercase tracking-widest font-bold">
                <Pencil size={11} className="mr-1" /> edit
              </Button>
            </Link>
          </div>
          <div className="border-t border-border/60 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">availability</p>
            <div className="flex gap-1.5">
              {AVAILABILITY.map(a => (
                <button key={a} disabled={updating} onClick={() => setAvailability(a)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors lowercase ${
                    profile.availability === a ? 'bg-foreground text-background border-foreground' : 'bg-muted text-foreground/70 border-transparent hover:border-foreground/30'
                  }`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <Stat label="open in city" value={open.length} />
          <Stat label="matched to you" value={matched.length} />
          <Stat label="completed" value={matched.filter(r => r.status === 'completed').length} suffix="" />
        </div>

        {/* Matched requests */}
        <Section title="incoming requests" empty="no requests routed to you yet.">
          {matched.map(r => <RequestRow key={r.id} r={r} />)}
        </Section>

        {/* Open requests in city */}
        <Section title={`open in ${profile.city.toLowerCase()}`} empty="no open requests in your city right now.">
          {open.slice(0, 6).map(r => <RequestRow key={r.id} r={r} />)}
        </Section>

        {/* Trust + safety */}
        <div className="mt-8 rounded-xl border border-border/60 bg-muted/40 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">trust & safety</p>
          <p className="text-xs text-muted-foreground lowercase leading-relaxed">
            messages stay on-platform. don't share home addresses or full payment details. flag suspicious requests using the report button on each job. by accepting a job you agree to fulfill it as described.
          </p>
        </div>
      </div>
    </div>
  );
}

function Header({ onSignOut }: { onSignOut: () => void }) {
  return (
    <header className="px-6 py-4 border-b border-border/60 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <Link to="/localnetwork" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={12} /> back to map
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">localnetwork / dashboard</span>
        <button onClick={onSignOut} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
          <LogOut size={11} /> sign out
        </button>
      </div>
    </header>
  );
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">{value}{suffix ?? ''}</p>
    </div>
  );
}

function Section({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
  const arr = Array.isArray(children) ? children.flat() : [children];
  const hasItems = arr.some(Boolean) && arr.length > 0;
  return (
    <section className="mt-7">
      <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">{title}</h2>
      {hasItems ? (
        <div className="space-y-2">{children}</div>
      ) : (
        <p className="text-xs text-muted-foreground lowercase py-6 text-center border border-dashed border-border/60 rounded-xl">{empty}</p>
      )}
    </section>
  );
}

function RequestRow({ r }: { r: FabRequest }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-3.5 flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground lowercase truncate">{r.title}</h3>
          <span className="text-[9px] font-mono uppercase text-muted-foreground">{r.job_type}</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[10px] text-muted-foreground lowercase">
          <span>qty {r.quantity}</span>
          {r.material && <span>{r.material}</span>}
          <span className="flex items-center gap-1"><Clock size={10} />{r.urgency}</span>
          {r.budget_range && <span>{r.budget_range}</span>}
        </div>
      </div>
      <Button size="sm" variant="outline" className="text-[10px] uppercase tracking-widest font-bold">view</Button>
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">{children}</div>;
}