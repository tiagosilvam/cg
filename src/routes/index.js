import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import { Home } from "../pages/Home"
import { Reta } from "../pages/Reta"
import { Circunferencia } from "../pages/Circunferencia"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home}/>
                <Route path="/reta" Component={Reta}/>
                <Route path="/circunferencia" Component={Circunferencia}/>
            </Routes>
        </BrowserRouter>
    )
}