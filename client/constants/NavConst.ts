import { IoGridOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { IoMdSwap } from 'react-icons/io';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { TfiTarget } from 'react-icons/tfi';
import { PathRoutes } from './PathRoutes';

export const navItems = [
    { href: PathRoutes.OVERVIEW, label: 'Overview', icon: IoGridOutline },
    { href: PathRoutes.BALANCES, label: 'Balances', icon: MdAccountBalanceWallet },
    { href: PathRoutes.TRANSACTIONS, label: 'Transactions', icon: IoMdSwap },
    { href: PathRoutes.BILLS, label: 'Bills', icon: BiMoneyWithdraw },
    { href: PathRoutes.EXPENSES, label: 'Expenses', icon: FaMoneyCheckAlt },
    { href: PathRoutes.GOALS, label: 'Goals', icon: TfiTarget },
    { href: PathRoutes.SETTINGS, label: 'Settings', icon: IoSettingsOutline },
];
