import ReservationForm from "@/components/reservations/reservation-form";

export default function ReservationsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">Book Your Table</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
              Secure your spot for an unforgettable experience. We look forward to hosting you.
            </p>
          </div>

          <div className="mt-16">
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
