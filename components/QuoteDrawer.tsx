"use client";

import React, { useState } from "react";
import { X, Trash2, Mail, Building2, MapPin, Send, CheckCircle2, ClipboardList } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
}

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onClearCart: () => void;
}

export default function QuoteDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQty,
  onClearCart
}: QuoteDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    
    // Simulate API request submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClearCart();
      }, 500);
    }, 1800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ name: "", email: "", company: "", location: "", notes: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-lg transform border-l border-white/5 bg-zinc-950 p-6 shadow-2xl transition-all flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-orange-500" />
              <h2 className="font-display text-lg font-extrabold text-white">RFQ Basket Inquiry</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isSuccess ? (
            /* Success State */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 space-y-6">
              <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shadow-lg shadow-green-500/10">
                <CheckCircle2 className="h-8 w-8 animate-bounce" />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white">RFQ Submitted Successfully</h3>
              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                Thank you for choosing ROK. Our specialized industrial team is compiling your technical specifications. An engineer will reach out to you within 2 business hours.
              </p>
              <button
                onClick={handleReset}
                className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-black hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Back to Site
              </button>
            </div>
          ) : (
            /* Main Content Form & Cart list */
            <div className="flex-1 overflow-y-auto my-6 pr-2 space-y-8">
              
              {/* Basket list */}
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase">Selected items</h3>
                {items.length === 0 ? (
                  <div className="rounded-xl border border-white/5 bg-zinc-900/10 p-8 text-center text-zinc-500">
                    <p className="text-sm font-medium">Your request basket is currently empty.</p>
                    <p className="text-[10px] mt-1">Select products and services to request a bulk quote.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-zinc-900/20 p-4"
                      >
                        <div className="space-y-1 text-left">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                            <span>{item.category}</span>
                            <span>•</span>
                            <span>{item.price}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Qty controller for products */}
                          {item.price !== "Quote on Application" && (
                            <div className="flex items-center rounded-lg border border-white/10 bg-zinc-950 overflow-hidden">
                              <button
                                onClick={() => onUpdateQty(item.id, Math.max(10, item.quantity - 10))}
                                className="px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-mono font-bold text-white min-w-[28px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQty(item.id, item.quantity + 10)}
                                className="px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800"
                              >
                                +
                              </button>
                            </div>
                          )}

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase text-left">Procurement Details</h3>
                
                <div className="space-y-3 text-left">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full rounded-xl border border-white/5 bg-zinc-900/40 p-3 text-sm text-white placeholder-zinc-600 focus:border-orange-500/40 focus:ring-0 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Corporate Email</label>
                    <div className="relative">
                      <Mail className="absolute top-3.5 left-3.5 h-4 w-4 text-zinc-600" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.connor@mineralcorp.co.za"
                        className="w-full rounded-xl border border-white/5 bg-zinc-900/40 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-600 focus:border-orange-500/40 focus:ring-0 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Mining Enterprise</label>
                    <div className="relative">
                      <Building2 className="absolute top-3.5 left-3.5 h-4 w-4 text-zinc-600" />
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Mineral Corp South Africa"
                        className="w-full rounded-xl border border-white/5 bg-zinc-900/40 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-600 focus:border-orange-500/40 focus:ring-0 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Shaft Site / Delivery Location</label>
                    <div className="relative">
                      <MapPin className="absolute top-3.5 left-3.5 h-4 w-4 text-zinc-600" />
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Rustenburg Shaft 4, North West"
                        className="w-full rounded-xl border border-white/5 bg-zinc-900/40 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-600 focus:border-orange-500/40 focus:ring-0 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Custom Specs / Delivery Timeline</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Specify custom sizing for women's worksuits or excavator model details here..."
                      rows={3}
                      className="w-full rounded-xl border border-white/5 bg-zinc-900/40 p-3 text-sm text-white placeholder-zinc-600 focus:border-orange-500/40 focus:ring-0 focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={items.length === 0 || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-4 text-sm font-bold text-white hover:bg-orange-700 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-transparent hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Transmitting RFQ Package...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Transmit Quote Request
                    </>
                  )}
                </button>
              </form>

            </div>
          )}

          {/* Footer branding */}
          <div className="border-t border-white/5 pt-4 text-center">
            <p className="text-[10px] font-mono text-zinc-600">ROK SECURITY GATEWAY • ENCRYPTED PIPELINE</p>
          </div>

        </div>
      </div>
    </div>
  );
}
