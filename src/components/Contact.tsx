import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedElement } from "./AnimatedSection";

const Contact = () => {
  const { t } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.service) {
      toast.error("Please fill in all required fields");
      return;
    }

    const message = `Hi, I'm ${formData.name}.\n\nService: ${formData.service}\n\nMessage: ${formData.message}\n\nPhone: ${formData.phone}`;
    const whatsappNumber = "9441444876";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast.success(t("services.openingWhatsApp"));

    setFormData({
      name: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 94414 44876",
      href: "tel:+919441444876"
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: "Chat with us",
      href: "https://wa.me/9441444876"
    },
    {
      icon: Mail,
      label: "Email",
      value: "Id-renovatp@gmail.com",
      href: "mailto:Id-renovatp@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Anantapur, Andhra Pradesh",
      href: null
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon - Sat: 8AM - 8PM",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <AnimatedElement isVisible={headerVisible} animation="fadeInUp">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Get in Touch
            </span>
          </AnimatedElement>
          <AnimatedElement isVisible={headerVisible} animation="fadeInUp" delay={100}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              {t("contact.title")}
            </h2>
          </AnimatedElement>
          <AnimatedElement isVisible={headerVisible} animation="fadeInUp" delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </AnimatedElement>
        </div>

        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatedElement isVisible={contentVisible} animation="fadeInLeft" delay={100}>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h3>
              </AnimatedElement>
              
              {contactInfo.map((item, index) => (
                <AnimatedElement 
                  key={item.label} 
                  isVisible={contentVisible} 
                  animation="fadeInLeft" 
                  delay={150 + index * 50}
                >
                  {item.href ? (
                    <a 
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  )}
                </AnimatedElement>
              ))}

              {/* Trust message */}
              <AnimatedElement isVisible={contentVisible} animation="fadeInLeft" delay={400}>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mt-6">
                  <p className="text-sm text-muted-foreground italic">
                    "Just enquire with us, trust me we don't force you to use our services. Your satisfaction is our priority."
                  </p>
                </div>
              </AnimatedElement>
            </div>

            {/* Form Card */}
            <div className="lg:col-span-3">
              <AnimatedElement isVisible={contentVisible} animation="fadeInRight" delay={200}>
                <Card className="shadow-xl border-border/50 bg-card">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Request a Service
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Fill out the form and we'll get back to you within 24 hours
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("contact.name")} *</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                            className="h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">{t("contact.phone")} *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Service Required *</Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData({ ...formData, service: value })
                          }
                        >
                          <SelectTrigger id="service" className="h-12">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            <SelectItem value="civil-works">Civil Works</SelectItem>
                            <SelectItem value="tiles-granite">Tiles & Granite</SelectItem>
                            <SelectItem value="painting">Painting</SelectItem>
                            <SelectItem value="carpentry">Carpentry</SelectItem>
                            <SelectItem value="electrical">Electrical</SelectItem>
                            <SelectItem value="plumbing">Plumbing</SelectItem>
                            <SelectItem value="other">Other Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t("contact.message")}</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your requirements..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="accent"
                        size="lg"
                        className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Chat on WhatsApp
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;