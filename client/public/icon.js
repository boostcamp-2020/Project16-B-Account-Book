import * as GrIcons from 'react-icons/gr';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';

const icon = {
  meal: <GiIcons.GiMeal size={15} />,
  cafe: <IoIcons.IoMdCafe size={15} />,
  drink: <BiIcons.BiDrink size={15} />,
  living: <HiIcons.HiShoppingCart size={15} />,
  onlineShopping: <BiIcons.BiMouseAlt size={15} />,
  shopping: <FaIcons.FaShoppingBag size={12} />,
  finance: <GrIcons.GrMoney size={13} />,
  medical: <FaIcons.FaBriefcaseMedical size={12} />,
  more: <MdIcons.MdMoreVert size={20} />,
  tagDefault: <MdIcons.MdLocalOffer size={15} />,
  addBtn: (
    <FcIcons.FcPlus
      size={40}
      style={{
        filter: `drop-shadow(4px 2px 2px rgba(0, 0, 0, 0.173))`,
      }}
    />
  ),
};

export default icon;
