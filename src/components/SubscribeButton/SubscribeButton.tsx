import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';

import styles from './styles.module.scss';

export function SubscribeButton() {

    const {data: session} = useSession();
    const router = useRouter();
    
    async function handleSubscribeButton() {
        if (!session) {
            signIn('github');
            
            return;
        };

        if (session.activeSubscription) {
            router.push("/posts");

            return;
        };

        try{
            const response = await api.post('/subscribe');

            const { sessionId } = await response.data;

            const stripe = await getStripeJS();

            await stripe.redirectToCheckout({ sessionId });
            
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribeButton}
        >
            Subscribe now
        </button>
    );
}