import React from "react";
import Logo from "../../../assets/icons/xyz-logo.png"
import Image from "../Image/Image";

const Header = ()=>{
    return(
        <>
        <Image src={Logo} alt="Logo" className="w-32 h-16" />
        </>
        
    )
}

export default Header;