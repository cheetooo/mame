import React,{useEffect,useState} from 'react';
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
    const test = () =>{
        return(
            channels.length?<Swiper {...params}>
            {
                channels.map((item, index)=>(
                        item.chls.length === 0 
                        ?<div style={{display:'none'}}></div>
                        :item.group_name === ''?
                        item.chls.map((child_item, index)=>(
                            <div  key={`${child_item.id}${index}`} onClick={()=>{setChannelDispatch(child_item);setMHZDispatch(0)}}> 
                                <p style={{color:`${child_item.id == currentChannel.id&&!currentMHz?'red':''}`}}>{child_item.name}</p>
                            </div> 
                        ))
                        :
                        <div  key={`${item.group_id}${index}`}  onClick={()=>{setMHZDispatch(item.group_id)}}> 
                            <p style={{color:`${currentMHz == item.group_id?'red':''}`}}>{item.group_name}</p>
                        </div>
                ))
            }      
            </Swiper>:""
        )
    }
    return(
        <div style={{height:'100%',width:'100%',overflowY:'scroll',display:'flex'}}>
        <div className="main_channel" style={{width:'50%',height:'50%'}}>
            <Link to="/">回主页</Link>
            {test()}
        </div>
        <div className="current_channel" style={{background:'#b5b5b5',height:'auto',width:'50%'}}>
            {currentMHz
            ?channels.find((element)=>
                element.group_id == currentMHz
            ).chls.map((item,index)=>(
                <div key={`${item.id}${index}`} onClick={()=>{setChannelDispatch(item)}} style={{color:`${item.id == currentChannel.id?'red':''}`}} >{item.name}</div>
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
