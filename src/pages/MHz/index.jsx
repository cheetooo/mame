import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setChannel} from '../Audio/store/actionCreators';


const MHz = (props) =>{
    const { channels,
            currentChannel,
            setChannelDispatch} = props
    const {genre_groups, groups} = channels;
    return(
        <div style={{height:'100%',width:'100%',overflowY:'scroll'}}>
        <div>
            <Link to="/">回主页</Link>
            {
                groups.map((item, index)=>(
                        <div key={`${item.id}${index}`}> 
                        <p>{item.group_name}</p>
                        <div style={{display:'flex'}}>{
                                item.chls.map((child_item,item_index) =>
                                        <p key={`${item.group_id}${item_index}${child_item.id}`} style={{color:`${child_item.id==currentChannel.id?'red':'#b5b5b5'}`}} onClick={()=>setChannelDispatch(child_item)}>{child_item.name}</p>
                                    )
                                }
                            </div> 
                            </div>
                ))
            }
            {
                genre_groups.map((item, index)=>
                        <div key={`${item.id}${index}`}>
                            <p>{item.group_name}</p>
                            <div style={{display:'flex'}}>{
                                item.chls.map((child_item,item_index) =>
                                        <p key={`${item.group_id}${item_index}${child_item.id}`} style={{color:`${child_item.id==currentChannel.id?'red':'#b5b5b5'}`}} onClick={()=>setChannelDispatch(child_item)}>{child_item.name}</p>
                                    )
                                }
                            </div> 
                        </div>                   
                )
            }
            
        </div>
        </div>
    )
}

const mapStateToProps = state =>({
    channels: state.getIn(['audio', 'appIndexChannel']).toJS(),
    currentChannel: state.getIn(['audio', 'currentChannel'])
})
const mapDispatchToProps = dispatch =>({
    setChannelDispatch: id => dispatch(setChannel(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(MHz)
