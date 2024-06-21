// import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'
import openseaLogo from '../assets/opensea.png'
// import { AiOutlineSearch } from 'react-icons/ai'
// import { CgProfile } from 'react-icons/cg'
// import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = () => {
  return (
    <div className={style.wrapper}>
      <a href="/">
        <div className={style.logoContainer}>
          <img src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png" height={40} width={40} />
          <div className={style.logoText}>Opensea</div>
        </div>
      </a>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <img src="https://cdn.imgbin.com/17/18/14/imgbin-computer-icons-search-box-button-button-EJe5CdpnFg2GQA6h6PpqD5L9X.jpg" alt="" />
        </div>
        <input
          className={style.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={style.headerItems}>
        <a href="/collections/0x66a576A977b7Bccf510630E0aA5e450EC11361Fa">
          <div className={style.headerItem}> Collections </div>
        </a>
        <div className={style.headerItem}> Stats </div>
        <div className={style.headerItem}> Resources </div>
        <div className={style.headerItem}> Create </div>
        <div className={style.headerIcon}>
          <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" />
        </div>
        {/* <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div> */}
      </div>
    </div>
  )
}

export default Header
