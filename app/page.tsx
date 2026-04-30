import Hero from "@/components/shared/Hero";
import NursesList from "@/components/features/nurses/NursesList";
import DoctorsList from "@/components/features/doctors/DoctorsList";
import MedicineList from "@/components/features/medicine/MedicineList";
import { NurseService } from "@/lib/nurses/actions";
import { DoctorService } from "@/lib/doctors/actions";
import { MedicineService } from "@/lib/medicine/actions";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Section } from "@/components/ui";
import { APP_SERVICES } from "@/constants";

export default async function Home() {
  const nursesData = NurseService.getFeatured();
  const doctorsData = DoctorService.getFeatured();
  const medicinesData = MedicineService.getFeatured();

  const [nurses, doctors, medicines] = await Promise.all([nursesData, doctorsData, medicinesData]);

  return (
    <>
      <Hero />

      {/* Medicine List */}
      <MedicineList
        medicines={medicines}
        showView={false}
        title="Featured Medicines"
        subtitle="Genuine Products"
        viewAllLink="/medicine"
      />

      {/* Doctors List */}
      <DoctorsList
        doctors={doctors}
        showView={false}
        title="Our Expert Doctors"
        subtitle="Medical Specialists"
        viewAllLink="/doctors"
      />

      {/* Nurses List */}
      <NursesList
        nurses={nurses}
        showView={false}
        title="Compassionate Nurses"
        subtitle="Dedicated Care"
        viewAllLink="/nurses"
      />

      {/* Medicine Services at a Glance */}
      <Section className="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Medicine Services at a Glance</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Ensuring availability, timely delivery, and affordable services for our customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {APP_SERVICES.map((item, idx) => (
            <div key={idx} className="p-8 bg-white rounded-3xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-3xl text-black">
                <Icon icon={item.icon} />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
              <div className="text-4xl font-extrabold text-black mb-2">{item.value}</div>
              <p className="text-gray-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Our Pharmacy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6 tracking-tight">Why Choose Our Pharmacy?</h2>
              <p className="text-lg text-gray-500 mb-12 leading-relaxed">
                Delivering quality medicines at your convenience—trusted by thousands for affordability, reliability, and exceptional service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {[
                  { title: "Extensive Inventory", desc: "Access a wide variety of medications including rare drugs from trusted suppliers.", icon: "solar:box-linear" },
                  { title: "Fast Delivery", desc: "Get your medications delivered quickly and reliably right to your doorstep.", icon: "solar:rocket-linear" },
                  { title: "Affordable Pricing", desc: "Competitive pricing with discounts on bulk orders. No hidden fees.", icon: "solar:tag-linear" },
                  { title: "Certified Products", desc: "All medications undergo strict quality checks ensuring safety and efficacy.", icon: "solar:shield-check-linear" },
                  { title: "Smart Suggestions", desc: "AI-driven recommendations based on your prescription history.", icon: "solar:cpu-linear" },
                  { title: "Easy Refills", desc: "Seamless refill process for recurring prescriptions with reminders.", icon: "solar:restart-linear" },
                  { title: "Nationwide", desc: "Order from anywhere in the country with our extensive delivery network.", icon: "solar:map-point-linear" },
                  { title: "Live Tracking", desc: "Track your orders in real-time with our intuitive tracking system.", icon: "solar:map-search-linear" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 text-black group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon icon={item.icon} className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1 group-hover:text-black transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-none">
              <Image
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1979&auto=format&fit=crop"
                alt="Pharmacy Services"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="text-5xl font-bold mb-2">100%</div>
                  <div className="text-xl font-medium opacity-90">Genuine Medicines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
