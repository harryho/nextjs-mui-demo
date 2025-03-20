import Link from "next/link";
import { Button, styled } from "@mui/material";
import Image from "next/image";
import { redirect } from "next/navigation";

// const LinkStyled = styled(Link)(() => ({
//   // height: "100px",
//   width: "400px",
//   overflow: "hidden",
//   display: "flex",
//   textDecoration: 'none' 
// }));


type Props = {
  title?: string
  img?: string,
  alt?: string,
  height?: number,
  width?: number
}

const Logo = ({ title, img, alt, height, width }: Props) => {
  return (
    <Button onClick={() => redirect("/")}>
      <Image src={img ? img : "/images/logos/dark-logo.svg"}
        alt={alt ? alt : "logo"} height={height ? height : 50} width={width ? width : 150} priority />
      <h1 style={{ marginLeft: "15px", color: "#556cd6", fontSize: "24px" }}>  NextJS Demo </h1>

    </Button>
  );
}

export default Logo;
