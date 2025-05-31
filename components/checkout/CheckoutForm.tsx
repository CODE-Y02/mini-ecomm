"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createOrder } from "@/actions/order";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Zod schema validation with regex
const formSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full Name is required.")
    .regex(/^[a-zA-Z\s]+$/, "Full Name must only contain letters and spaces."),
  email: z.string().email("Invalid email format."),
  phone: z
    .string()
    .regex(
      /^(\+91[\s-]?)?[0-9]{10}$/,
      "Phone number must be a valid number or in format +91XXXXXXXXXX."
    ),
  address: z.string().min(10, "Address  must have at least 10 characters."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  zipCode: z
    .string()
    .length(6, "Zip Code must be 6 digits.")
    .regex(/^[0-9]{6}$/, "Zip Code must be numeric."),
  cardNumber: z
    .string()
    .length(16, "Card number must be 16 digits.")
    .regex(/^[0-9]{16}$/, "Card number must be numeric."),
  expiryDate: z.string().refine(
    (val) => {
      const today = new Date();
      const expiryDate = new Date(val);
      return expiryDate > today;
    },
    { message: "Expiry date must be a future date." }
  ),
  ccv: z
    .string()
    .length(3, "CVV must be 3 digits.")
    .regex(/^[0-9]{3}$/, "CVV must be numeric."),
});

export type TFormSchema = z.infer<typeof formSchema>;

export function CheckoutForm() {
  const [isPending, SetPending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      expiryDate: "",
      ccv: "",
    },
  });

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();

  // Define a submit handler.
  async function onSubmit(values: TFormSchema) {
    SetPending(true);
    try {
      const order = await createOrder({ checkoutInfo: values, items });
      if (order) {
        toast.success(
          "Order created Successfully you will get status in your email"
        );
        form.reset();
        clearCart();

        router.push("/thanks/?o=" + order.id);
      }
    } catch (error) {
      toast.error("Failed to create order. Please try again.", {
        description: (error as Error)?.message,
        style: {
          backgroundColor: "red",
          color: "white",
          border: 0,
          fontWeight: "800",
        },
      });
    } finally {
      SetPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Fields */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Street address"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your city"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* State */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your state"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Zip Code */}
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your zip code"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Card Number */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your 16-digit card number"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiry Date */}
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CVV */}
        <FormField
          control={form.control}
          name="ccv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your 3-digit CVV"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating Order..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
