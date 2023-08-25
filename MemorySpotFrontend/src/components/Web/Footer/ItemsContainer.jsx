import Item from "./Item";
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT } from "./Menus";
import Logo from '../../../assets/images/Memory Spot - Icons_MsIcon-Coral.png';
import '../../../assets/css/landing.css';
import { Heading } from "@chakra-ui/react";
const ItemsContainer = () => {
  return (
    <div className="flex justify-evenly pyy-5 item-center" style={{width: '100vw',paddingTop:'3rem',height:'15rem'}}>
      <div className="flex justify-center item-center" style={{width:'30vw'}}>
          <div className="" >
            <img src={Logo} style={{height:'auto',width:'5rem',marginTop:'0rem'}} className="footer-logo" alt="" />
          </div>
          <div className="flex flex-direction-column">
          <h1 className="mb-1 font-semibold pl-5">Memory Spot</h1>
          <div className="w-25v pl-5 text-gray-400 text-sm">
          This is first ever social media website which will give you real time experience of other people 
          </div>
          </div>
        </div>
      <Item Links={PRODUCTS} title="FEATURES" />
      {/* <Item Links={RESOURCES} title="RESOURCES" /> */}
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

export default ItemsContainer;
