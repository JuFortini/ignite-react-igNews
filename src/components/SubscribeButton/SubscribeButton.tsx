import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton(priceId: SubscribeButtonProps) {

    const {data: session} = useSession();

    async function handleSubscribeButton() {
        if (!session) {
            signIn('github')

            return;
        }

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