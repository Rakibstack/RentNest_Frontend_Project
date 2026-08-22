"use client";

import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Mail,
    title: "Email us",
    description: "Our team is ready to help.",
    value: "hello@rentnest.com",
  },
  {
    icon: Phone,
    title: "Call us",
    description: "Mon–Fri from 9am to 6pm.",
    value: "+880 1XXX-XXXXXX",
  },
  {
    icon: MapPin,
    title: "Visit us",
    description: "Come say hello at our office.",
    value: "Dhaka, Bangladesh",
  },
];

const faqs = [
  {
    question: "How can I find a property on RentNest?",
    answer:
      "You can browse available properties from the Properties page and use search and filters to find a suitable place.",
  },
  {
    question: "Can I list my property?",
    answer:
      "Yes. Property owners can list their properties and manage rental requests through their dashboard.",
  },
  {
    question: "How do rental requests work?",
    answer:
      "Tenants can send a rental request for an available property. The property owner can then review and manage the request.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <MessageCircle className="size-4 text-primary" />
              Get in touch
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s talk about your
              <span className="text-primary"> next move.</span>
            </h1>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              Have a question about RentNest, a property, or your rental
              journey? Send us a message and our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-border/70 bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-5 font-semibold">{item.title}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>

                <p className="mt-4 text-sm font-medium">{item.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-border/70 bg-muted/30 lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2"
              alt="Modern RentNest workspace"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-md p-8 text-white sm:p-10">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <MessageCircle className="size-5" />
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                We&apos;re here to help.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/75">
                Whether you&apos;re looking for a home, listing a property, or
                simply have a question, our team is ready to help.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
                <Clock3 className="size-4" />
                Usually replies within 24 hours
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-background p-6 sm:p-10 lg:p-12">
            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Send a message
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                How can we help?
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Fill out the form and we&apos;ll get back to you as soon as
                possible.
              </p>

              <form className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium"
                    >
                      Your name
                    </label>

                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium"
                    >
                      Email address
                    </label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium"
                  >
                    Subject
                  </label>

                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium"
                  >
                    Message
                  </label>

                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us a little about your question..."
                    className="min-h-36 resize-none rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl"
                >
                  Send Message
                  <Send className="ml-2 size-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              FAQ
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Before you reach out
            </h2>

            <p className="mt-4 text-muted-foreground">
              You might find the answer you&apos;re looking for here.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border/70 bg-background px-6 py-5"
              >
                <summary className="cursor-pointer list-none font-semibold">
                  <div className="flex items-center justify-between gap-4">
                    {faq.question}

                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
                  </div>
                </summary>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Still have questions?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-primary-foreground/75">
            We&apos;re always happy to help you make your rental journey
            easier.
          </p>

          <Button
            variant="secondary"
            className="mt-7 rounded-full px-6"
            onClick={() =>
              document
                .getElementById("name")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact our team
            <ArrowUpRight className="ml-2 size-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}