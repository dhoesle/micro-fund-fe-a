import React from 'react';
import { getExampleData } from '../../../api';
import logo from '../../../images/microLogo.png';
import { List } from '../../common';
import PartnerAdminsPage from './RenderPartnerAdminsPage';

const PartnerAdmins = () => {
  return (
    <List
      getItemsData={getExampleData}
      LoadingComponent={() => <div>Loading Items...</div>}
      RenderItems={PartnerAdminsPage}
    />
  );
};

export default PartnerAdmins;
{
  /* <div>
    <div>
    <img src={logo} alt = 'Micro Fund'/> 
    </div>

    <div>

    </div>
</div> */
}