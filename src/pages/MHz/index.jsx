import React,{useEffect,useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setChannel, setMHZ} from '../Audio/store/actionCreators';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/lib/styles/css/swiper.css';

const MHz = (props) =>{
    const [swiper ,updateSwiper] = useState(null)
    const { channels,
            currentMHz,
            currentChannel,
            setMHZDispatch,
            setChannelDispatch} = props
    // const {genre_groups, groups} = channels;
    const type1 = useMemo(()=>Array.prototype.slice.call(channels,0,1),[channels])
    // const type1 = Array.prototype.slice.call(channels,0,1)
    const type2 = Array.prototype.slice.call(channels,1,-1)
    
    const params = {
      direction: 'vertical',
      slidesPerView: 3,
      centeredSlides: true,
      slideToClickedSlide:true,
      mousewheel: true,
      getSwiper: updateSwiper,
      initialSlide:channels.findIndex((item =>(
        currentMHz == item.group_id
      ))),
    }
    useEffect(() => {
    if (swiper !== null) {
      swiper.on("slideChange", ()=>{channels[swiper.activeIndex].id?setChannelDispatch(channels[swiper.activeIndex]):setMHZDispatch(channels[swiper.activeIndex].group_id)});
    }
  }, [swiper]);
    return(
        <div style={{height:'100%',width:'100%'}}>
        <div className="main_channel" style={{width:'100%',overflow:'hidden'}}>
            <div style={{fontSize:'16px',fontWeight:'bold'}}><Link to="/" style={{marginTop:'20px',display:'inline-block'}}>回主页</Link>{currentChannel.name}</div>
            {/* {
                channels.map((item, index) => (
                    !item.chls.length
                    ? ''
                    : !item.group_name
                    ? 
                    <div key={index} style={{background:'#b5b5b5',display:'flex'}}>
                    {item.chls.map((child_item, index)=>(
                        <div key={`${child_item.id}${index}`} onClick={()=>{setChannelDispatch(child_item);setMHZDispatch(0)}}>
                            <p style={{color:`${child_item.id == currentChannel.id&&!currentMHz?'red':''}`}}>
                                {child_item.name}
                            </p>
                        </div>
                    ))}
                    </div>
                    :
                    <div style={{float:'left'}} key={`${item.group_id}${index}`}  onClick={()=>{setMHZDispatch(item.group_id)}}> 
                        <p style={{color:`${currentMHz == item.group_id?'red':''}`}}>{item.group_name}</p>
                    </div>
                ))
            } */}
            <div style={{borderBottom:'1px solid #ebebeb',display:'flex'}}>
            {   
                type1.length
                ?
                type1[0].chls.map((item, index)=>(
                    <div key={`${item.id}${index}`} onClick={()=>{setChannelDispatch(item);setMHZDispatch(0)}}>
                        <p style={{color:`${item.id == currentChannel.id&&!currentMHz?'red':''}`}}>{item.name}</p>
                    </div>
                ))
                :
                null
            }
            </div>
            <div style={{display:'flex',justifyContent:'space-around'}}>
                {
                    type2.length
                    ?type2.map((item, index) => (
                        item.chls.length
                        ?<div style={{borderLeft:'2px solid #de241d'}} key={`${item.group_id}${index}`}  onClick={()=>{setMHZDispatch(item.group_id)}}> 
                            <p style={{color:`${currentMHz == item.group_id?'red':''}`}}>{item.group_name}</p>
                        </div>
                        :null
                    ))
                    :null
                }
            </div>
        </div>
        <div className="current_channel" style={{background:'#b5b5b5',width:'100%',display:'flex',flexWrap:'wrap',alignItems:'flex-start'}}>
            {currentMHz
            ?channels.find((element)=>
                element.group_id == currentMHz
            ).chls.map((item,index)=>(
                <div key={`${item.id}${index}`} onClick={()=>{setChannelDispatch(item)}} style={{padding:'0 10px',color:`${item.id == currentChannel.id?'red':''}`}} >{item.name}</div>
            ))
            :""
            }
        </div>
        </div>
        
    )
}

const mapStateToProps = state =>({
    channels: state.getIn(['audio', 'appIndexChannel']).toJS(),
    currentChannel: state.getIn(['audio', 'currentChannel']),
    currentMHz: state.getIn(['audio', 'currentMHz'])
})
const mapDispatchToProps = dispatch =>({
    setChannelDispatch: id => dispatch(setChannel(id)),
    setMHZDispatch: id => dispatch(setMHZ(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MHz)
