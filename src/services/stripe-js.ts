import { loadStripe } from "@stripe/stripe-js";

export function getStripeJS() {
    const stripeJS = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    return stripeJS
}