import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pages
import { Pixel } from "../pages/Pixel"
import { Reta } from "../pages/Reta"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Pixel}/>
                <Route path="/pixel" Component={Pixel}/>
                <Route path="/reta" Component={Reta}/>
            </Routes>
        </BrowserRouter>
    )
}