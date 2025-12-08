'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '../ui/card';
import { useUser, useAuth, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useEffect } from 'react';
import { collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  date: z.date({
    required_error: 'A date for your reservation is required.',
  }),
  time: z.string({
    required_error: 'Please select a time.',
  }),
  partySize: z.string({
    required_error: 'Please select the number of guests.',
  }),
});

export type ReservationFormValues = z.infer<typeof formSchema>;

async function createReservation(
  firestore: any,
  data: ReservationFormValues,
  userId: string
) {
  try {
    const restaurantId = 'main-restaurant'; 

    const reservationData = {
      id: uuidv4(),
      restaurantId: restaurantId,
      userId: userId,
      reservationDateTime: new Date(
        `${data.date.toISOString().split('T')[0]}T${data.time}:00`
      ).toISOString(),
      partySize: parseInt(data.partySize, 10),
      status: 'Confirmed', 
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
    };

    const reservationsCol = collection(
      firestore,
      'restaurants',
      restaurantId,
      'tableReservations'
    );
    
    addDocumentNonBlocking(reservationsCol, reservationData);

    return { success: true, reservationId: reservationData.id };
  } catch (error) {
    console.error('Error creating reservation:', error);
    return { success: false, error: 'Failed to create reservation.' };
  }
}

export default function ReservationForm() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  async function onSubmit(values: ReservationFormValues) {
    if (!user) {
      toast({
        variant: "destructive",
        title: 'Authentication Error',
        description: 'You must be signed in to make a reservation. Please wait a moment and try again.',
      });
      if (!isUserLoading && auth) {
        initiateAnonymousSignIn(auth);
      }
      return;
    }

    if (!firestore) {
      toast({
        variant: "destructive",
        title: 'Database Error',
        description: 'Could not connect to the database. Please try again later.',
      });
      return;
    }

    const result = await createReservation(firestore, values, user.uid);

    if (result.success) {
      toast({
        title: 'Reservation Confirmed!',
        description: `Thank you, ${values.name}! Your table for ${values.partySize} is booked for ${format(values.date, 'PPP')} at ${values.time}.`,
      });
      form.reset();
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: result.error || 'Could not save your reservation. Please try again.',
      });
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0,0,0,0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </Trigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => `${i + 12}:00`).map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="partySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select party size" />
                        </Trigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(size => (
                          <SelectItem key={size} value={String(size)}>{size} {size > 1 ? 'people' : 'person'}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={form.formState.isSubmitting || isUserLoading}>
              {form.formState.isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
