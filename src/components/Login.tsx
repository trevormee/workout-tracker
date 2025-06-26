// Login.tsx

import { useActor } from "@xstate/react";
import { loginmachine } from "../machines/loginmachine";
import LoggedIn from "./LoggedIn";

function Login() {

    const [snapshot, send] = useActor(loginmachine);

    if(snapshot.matches("Complete")){
        return < LoggedIn />
    }

    return (
        <form onSubmit={(event) => send({ type: "submit", event})}>
            <input 
                type="text"
                value={snapshot.context.username}
                onChange={(e) => 
                    send({ type: "update-username", username: e.target.value})
                }
            />

            <button type="submit" disabled={snapshot.matches("Loading")}>
                Confirm
            </button>
            {snapshot.matches("Error") && <p>Error occured</p>}
        </form>
    )
}

export default Login;