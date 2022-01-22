import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {
    border,
    BorderProps, color,
    ColorProps,
    flexbox,
    FlexboxProps,
    layout,
    LayoutProps,
    space,
    SpaceProps
} from "styled-system";
import Image from 'next/image'
import FullScreen from "./FullScreen";
import _ from "lodash";
import ArrowLeft from '../public/icons/gallery-arrow-left.svg'
import ArrowRight from '../public/icons/gallery-arrow-right.svg'
import FullScreenIcon from '../public/icons/fullscreen.svg'
import CloseModal from "../public/icons/white-close-modal.svg";


const Flex = styled.div<FlexboxProps | SpaceProps>`
    display:flex;
    flex:1 1;
    width:100%;
    height:100%;
    flex-direction:column;
    ${space}
    ${flexbox}
`

const Cover = styled.div<SpaceProps|BorderProps|LayoutProps>`
    position:relative;
    width:100%;
    object-fit:cover;
    overflow:hidden;
    ${border}
    ${space}
    ${layout}
`

const Thumbnail = styled.div<LayoutProps>`
    display:flex;
    position:relative;
    overflow-x:visible;
    margin:0 auto;
    &::-webkit-scrollbar{
        display:none;
    }
    ${layout}
`

const GalleryItems = styled.div<LayoutProps | BorderProps>`
    border-radius:17px;
    overflow:hidden;
    position:relative;
    cursor:pointer;
    border:3px solid transparent;
    &:not(:last-child){
        margin-right:10px;
    }
    ${border}
    ${layout}
`

const Img = styled.div`
    position:absolute;
    cursor:pointer;
    &.right{
        right:20px;
        bottom:30px;
        height:24px;
    }
    &.left{
        left:20px;
        bottom:30px;
        height:24px;
    }
    &.fullscreenIcon{
        left:20px;
        top:20px;
        color:white;
    }
`

const No = styled.div`
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    color:white;
    height:28px;
`

const Div=styled.div`
    & img{
        object-fit:cover !important;
    }
`
const Piece=styled.div`
    position:relative;
`

const Index=styled.div<ColorProps>`
    color:white;
    text-align:center;
    padding:2px;
    width:80px;
    display:flex;
    justify-content:space-around;
    border-radius:8px;
    position:absolute;
    right:50%;
    transform:translate(50%,0);
    bottom:30px;
    ${color}
`

// @ts-ignore
const Shadow = styled.div <HTMLElement | LayoutProps |  { shadowDisplay: boolean,right:boolean,shadowBg:boolean}> ((props:{shadowDisplay:boolean,right:boolean,shadowBg:boolean} )=> {
    return {
        width:'100%',
        position:'relative',
        overflowX: 'hidden',
        "&::-webkit-scrollbar":{
            display:'none',
        },
        "&::after":{
            content:'""',
            display:props.shadowDisplay ? 'none':'block',
            background:props.shadowBg ? 'linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, #ffffff 84%)':'linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, #ffffff 84%)',
            width:'40px',
            right:0,
            top:0,
            position:'absolute',
            height:'100%',
        },
        "&::before":{
            content:'""',
            display:!props.right ? 'none':'block',
            background:props.shadowBg ? 'linear-gradient(to right, rgba(255, 255, 255, 0.01) 0%, #f5f6f4 84%)':'linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, #fffff 84%)',
            width:'40px',
            left:0,
            top:0,
            position:'absolute',
            height:'100%',
            zIndex:10,
        }
    }
},[layout])

const List=styled.div`
        width:100%;
        position:relative;
        overflow-x: scroll;
        &::-webkit-scrollbar{
            display:none;
        }
`
export default function SwipingGallery(props: { images: any,shadowBg:string,leftArrow:any, rightArrow:any, fullScreenIcon:any, exitFullScreen:any, thumbnailDisplay:boolean, activeBorder:string,coverHeight:string , indexIndicator:string }) {
    const [index, setIndex] = useState(1)
    const [show, setShow] = useState(false)
    const [startT, setStartT] = useState<number|any>(null)
    const [endT, setEndT] = useState<number|any>(null)
    const [scrollEnd, setScrollEnd] = useState(false)
    const [ShR, setShR] = useState(false)

    const Data = props.images
    const ref=useRef(null)
    const autoScroll=useRef(null)

    const swipeLeft = (e: any) => {
        e?.stopPropagation()
        if (index < Data.length - 1) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
    }

    const swipeRight = (e: any) => {
        e?.stopPropagation()
        if (index > 0) {
            setIndex(index - 1)
        } else {
            setIndex(Data.length - 1)
        }
    }


    function startTouch(e:any) {
        setStartT(e.changedTouches[0].pageX)
    }

    function endTouch(e: any) {
        setEndT(e.changedTouches[0].pageX)
    }

    useEffect(()=>{
        let e
        if (startT - endT > 0 ){
            //swipe left committed
            swipeLeft(e)
        }else{
            //swipe right committed
            swipeRight(e)
        }
    },[endT])

    function _onScrollY(e: UIEvent) {
        const target = e.target as HTMLDivElement;
        if ((-target.scrollLeft) + target.clientWidth === target.scrollWidth) {
            setScrollEnd(true)
        }else{
            setScrollEnd(false)
        }
        if(target.scrollLeft!==0) {
            setShR(true)
        }else{
            setShR(false)
        }
    }

    const onScrollY = useCallback(_.debounce(_onScrollY, 100), [])

    return (
        <Flex>
            <Cover height={props.coverHeight} ref={ref} borderRadius={[0,'20px']} mb={['0px','20px']} onClick={()=>setShow(true)} onTouchStart={(e:any)=>startTouch(e)} onTouchEnd={(e:any)=>endTouch(e)}>
                <Div>
                    <Image src={props.images[index]?.original ? props.images[index]?.original:props.images[index]?.image ? props.images[index]?.image:'/null.svg'} layout={'fill'} alt={''}/>
                </Div>
                <Img className={'left'} onClick={swipeRight}>
                    <Image src={props.leftArrow} height={'24px'} width={'24px'} alt={''}/>
                </Img>
                <Img className={'right'} onClick={swipeLeft}>
                    <Image src={props.rightArrow} height={'24px'} width={'24px'} alt={''}/>
                </Img>
                <Img className={'fullscreenIcon'}>
                    <Piece>
                        <Image src={props.fullScreenIcon} height={'35px'} width={'35px'} alt={''}/>
                        <No>{Data.length}</No>
                    </Piece>
                </Img>
                <Index bg={props.indexIndicator}>
                    <div>{index+1}</div>/<div>{Data.length}</div>
                </Index>
            </Cover>
            {//@ts-ignore
                <Shadow display={props.thumbnailDisplay ? 'flex':'none'} shadowDisplay={scrollEnd} shadowBg={props.shadowBg} right={((index + 1) * 100) - autoScroll?.current?.offsetWidth > 0}>
                    {//@ts-ignore
                        <List>
                            {//@ts-ignore
                                <Thumbnail style={{transform: ((index + 1) * 100) - autoScroll?.current?.offsetWidth > 0 ? "translateX(" + `${((index + 1) * 100) - (autoScroll.current?.offsetWidth - 100)}` + "px)" : null}}
                                           ref={autoScroll} onScroll={(e: any) => onScrollY(e)} display={['none', 'flex']}>
                                    {
                                        Data.map((item: any, i: number) => (
                                            <GalleryItems
                                                key={i}
                                                border={index === i ? props.activeBorder : ''}
                                                minWidth={Data[i]?.thumbnailWidth ? Data[i]?.thumbnailWidth:'76px'}
                                                height={Data[i]?.thumbnailHeight ? Data[i]?.thumbnailHeight:'97px'}
                                                onClick={() => setIndex(i)}>
                                                <Image src={Data[i]?.original ? Data[i]?.original : Data[i]?.image ? Data[i]?.image : '/null.svg'} layout={'fill'} alt={''}/>
                                            </GalleryItems>
                                        ))
                                    }
                                </Thumbnail>}
                        </List>}
                </Shadow>
            }
            <FullScreen setShow={setShow} show={show} images={Data}/>
        </Flex>
    )
}

SwipingGallery.defaultProps={
    shadowBg:'linear-gradient(to left, rgba(255, 255, 255, 0.01) 0%, #ffffff 84%)',
    leftArrow: ArrowLeft,
    rightArrow: ArrowRight,
    fullScreenIcon: FullScreenIcon,
    exitFullScreen: CloseModal,
    thumbnailDisplay: true,
    activeBorder: '3px solid #db143d',
    coverHeight: '327px',
    indexIndicator: 'rgba(255,255,255,35%)'

}
