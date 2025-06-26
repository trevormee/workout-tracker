// loginmachine.ts

import { setup, assign, assertEvent, fromPromise } from "xstate";

export interface Context {
  username: string;
}
export const initialContext: Context = { username: "" };

export const postRequest = async (context: Context) => {
//   new Promise<Context>((resolve) =>
//     setTimeout(() => {
//       resolve(context);
//     }, 1000)
    const res = await fetch(`http://localhost:3001/users?username=${context.username}`);
    const users = await res.json();
    if(users.length === 0){
        throw new Error("User not found");
    }
    return context;
};

type Event = 
    | { type: "update-username", username: string }
    | { type: "submit"; event: React.FormEvent<HTMLFormElement>};

const submitActor = fromPromise(
  async ({
    input,
  }: {
    input: { event: React.FormEvent<HTMLFormElement>; context: Context };
  }) => {
    input.event.preventDefault();
    await postRequest(input.context);
  }
);


export const loginmachine = setup({
    types: {
        context: {} as Context,
        events: {} as Event,
    },
    actors: { submitActor },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgFEJcAXAqAYgFcAHCdKsAWgdjACd90qMAG0ADAF1EoJgHtY1XDPxSQAD0QAWAEwAaEAE9EWjaJIBOAKwBmAIxaA7HaujbGjQF93etFjyFSFAr49LAMAEao1GKSSCCy8jRKKuoIWs4kVmaiAGwOWqL22qJ2eoYIVho2JCa51lppFtnZ9p7eGDgExCQAMjLolMF0EEpgJAQAbjIA1qM+Hf49fQNQCBMymGyK+NHRKvEKSbEp2TZm5tkAHPaN9sYa2WalRlpnVg-2Zlb2ohYWF8YXVogOZ+Lq9fq0Oh8XgyXgkJgAGzYADNYagSCDOqRwctVvhJhtEtsJLtYvsickjOlMjk8gUiiUDIgbPZ7CQLu9PvUfhZ6hYgZiFmReDDeIwWGxONw+AIhKTpHIDsojppdEyEBcqhZRDqdRYWRdRFpGgL2qCAiLYXRQhEohI9oqKSrUtSsrlbvT8oyynyMpy3hcLGZTjZPF4QPgZBA4CpBcQHQktpSEBxsk8UxZzGZsznczmrKbfFjyJQaMEE0rk-ZsiQHtY7JYNJr-mn1RUqm7jVZ6lZGs1C-MwUtaBWnaAUpUrCRtbrtIacpV0-kNOyHobfhcm1kWuG4xbRaOk87q7XLLYXhYmzYW+nr1pqvWtE1r1Yvv8B+aSABhGSoRFgdhD0OcdEENFdtGvC4rE1DRbk1JctAuP0zA+AMgxDMN3CAA */
    
    context: initialContext,
    initial: "Editing",         // Initial state to be editing
    states: {
        // Editing State -- when (on) the event update-username occurs, execute actions,
        // when submit event occurs, transistion to the loading state
        Editing: {
            on: {
                "update-username": {
                    actions: assign(({ event }) => ({
                        username: event.username,
                    })),
                },
                submit: { target: "Loading"}

            }
        },

        // Loading State -- invoke the submitActor function so that it runs
        // immediately when we enter the loading state. If we return successfully,
        // transition to the Complete state. If we return un-successfully, transition
        // to the error state
        Loading: {
            invoke: {
                src: "submitActor",
                input: ({ event, context }) => {
                    assertEvent(event, "submit");
                    return { event: event.event, context};
                },
                onDone: { target: "Complete"},
                onError: { target: "Error" },
            },
        },

        Error: {
            on: {
                "update-username": {
                actions: assign(({ event }) => ({
                    username: event.username,
                })),
            },
            submit: { target: "Loading" },
      },
        },
        
        Complete: {},

    },
});