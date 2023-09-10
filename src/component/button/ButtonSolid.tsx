import React, { ReactNode } from "react";
import "./buttonSolid.scss";
interface Props {
  text: string;
  onSubmit: () => void;
  disabled?: boolean;
  icons?:any;
  background?:string;
  color?:string;
  outline?:boolean
  submit?: boolean;
  hover?: boolean;
}
const ButtonSolid = ({ text, onSubmit, disabled,icons,background,color,outline,submit = false, hover = true }: Props) => {
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      // Handle Enter key press action
      onSubmit()
    }
  };
  const disableButtons = disabled ? "disabled-button" : "" 
  const disableHover = !hover ? "disabled-hover" : "" 
  const content = (): ReactNode =>{
    if(icons){
      return <div><div className="icon">{icons}</div>{text}</div>
    }else{
      return <div>{text}</div>
    }
  }
  return (
    <div className={`btn ${outline ? 'outline outline-none' : ''}`}>
      <button
       type={submit ? 'submit' : 'button'}
        onKeyDown={handleKeyPress}
        onClick={onSubmit}
        className={`${disableButtons} ${disableHover}`}
        style={{background,color}}
      >
      {content()}  
      </button>
    </div>
  );
};

export default ButtonSolid;
