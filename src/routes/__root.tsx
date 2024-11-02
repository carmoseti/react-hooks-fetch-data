import {createRootRoute, Link, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: () => (
        <main>
            <div className="links-bar">
                <Link to={'/fetch-data/from-state'}>1. Fetch data from state</Link>
                <Link to={'/fetch-data/refetch'}>2. Refetch</Link>
                <Link to={'/fetch-data/with-form'}>3. With form</Link>
                <Link to={'/fetch-data/with-loader'}>4. With loader</Link>
                <Link to={'/fetch-data/with-error-handling'}>5. With error handling</Link>
                <Link to={'/fetch-data/using-custom-hook'}>6. Using custom hook</Link>
                <Link to={'/fetch-data/with-abort'}>7. With abort</Link>
                <Link to={'/fetch-data/using-react-query'}>8. Using react query</Link>
            </div>
            <Outlet />
            <TanStackRouterDevtools />
        </main>
    ),
})