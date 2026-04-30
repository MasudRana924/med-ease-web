import { Metadata } from "next";
import DoctorsList from "@/components/features/doctors/DoctorsList";
import { DoctorService } from "@/lib/doctors/actions";
import PageHero from "@/components/shared/PageHero";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Doctors - MedEase",
    description: "Expert medical specialists provided by MedEase.",
};

export default async function DoctorsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const name = params.name as string;
    const work = params.work as string;
    const expert = params.expert as string;

    const doctors = await DoctorService.getAll({
        page,
        limit,
        name,
        work,
        expert
    });

    return (
        <div className="pb-20">
            <PageHero
                title="Expert Medical Specialists"
                description="Consult with our team of world-class doctors and specialists dedicated to providing you with the best medical care."
                image="/images/doctor-hero.png"
                icon="solar:stethoscope-bold"
            />

            <div className="container mx-auto px-4">
                <DoctorsList doctors={doctors} />
            </div>
        </div>
    );
}
