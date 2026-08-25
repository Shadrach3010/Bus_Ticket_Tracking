import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

function publicUser(profile) {
  return { id: profile.id, firstName: profile.first_name, middleName: profile.middle_name || undefined,
    lastName: profile.last_name, name: [profile.first_name, profile.middle_name, profile.last_name].filter(Boolean).join(" "),
    email: profile.email, phone: profile.phone || undefined, nationalId: profile.national_id || undefined,
    role: profile.role, avatarUrl: profile.avatar_url || undefined, emergencyContact: profile.emergency_contact || undefined,
    preferredCurrency: profile.preferred_currency || undefined };
}

export async function GET() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error || !profile) return NextResponse.json({ message: "Profile not found." }, { status: 404 });
  return NextResponse.json({ user: publicUser(profile) });
}

export async function PUT(request) {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { data: profile, error } = await supabase.from("profiles").update({
    first_name: String(body.firstName ?? "").trim(),
    middle_name: String(body.middleName ?? "").trim() || null,
    last_name: String(body.lastName ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    national_id: String(body.nationalId ?? "").trim() || null,
    emergency_contact: String(body.emergencyContact ?? "").trim() || null,
    preferred_currency: String(body.preferredCurrency ?? "NLe").trim(),
    avatar_url: String(body.profileImage ?? body.avatarUrl ?? "").trim() || null,
  }).eq("id", userId).select().single();
  if (error || !profile) return NextResponse.json({ message: error?.message ?? "Profile not found." }, { status: 400 });
  return NextResponse.json({ user: publicUser(profile) });
}
