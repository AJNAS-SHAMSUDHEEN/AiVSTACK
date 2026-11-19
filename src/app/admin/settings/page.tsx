"use client";

import { useEffect, useState } from "react";
import { SiteSettings } from "@/lib/db";
import { Settings, Save, CheckCircle, Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#A78BFA] border-t-transparent" />
        <p className="mt-3 text-xs font-semibold text-[#706B7D]">Loading Site Configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#24202D]">
          Website Configuration & Settings
        </h1>
        <p className="text-sm text-[#706B7D] mt-1">
          Update global contact channels, official corporate email, and brand descriptors.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand Lockups */}
        <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Sparkles className="h-5 w-5 text-[#7C3AED]" />
            <h2 className="font-heading text-lg font-bold text-[#30224D]">
              Brand Metadata & Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Official Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Brand Descriptor
              </label>
              <input
                type="text"
                value={settings.brandDescriptor}
                onChange={(e) => setSettings({ ...settings, brandDescriptor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Channels */}
        <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Mail className="h-5 w-5 text-[#7C3AED]" />
            <h2 className="font-heading text-lg font-bold text-[#30224D]">
              Direct Contact Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Company Email Address
              </label>
              <input
                type="email"
                value={settings.companyEmail}
                onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                WhatsApp Phone Number
              </label>
              <input
                type="text"
                value={settings.whatsappContact}
                onChange={(e) => setSettings({ ...settings, whatsappContact: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Operational Base / Region
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Support Line
              </label>
              <input
                type="text"
                value={settings.phoneNumber}
                onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-3xl border border-[#A78BFA]/20 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Globe className="h-5 w-5 text-[#7C3AED]" />
            <h2 className="font-heading text-lg font-bold text-[#30224D]">
              Social & Network Profiles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                GitHub Organization URL
              </label>
              <input
                type="url"
                value={settings.githubUrl}
                onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={settings.linkedinUrl}
                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={settings.twitterUrl}
                onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#24202D] mb-2">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAFAFF] text-sm text-[#24202D] focus:border-[#7C3AED] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-[#30224D] px-8 py-3 text-xs font-bold text-white hover:bg-[#201535] transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4 text-[#A78BFA]" />
            <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
          </button>

          {saveSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle className="h-4 w-4" />
              <span>Configuration successfully saved to database!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
