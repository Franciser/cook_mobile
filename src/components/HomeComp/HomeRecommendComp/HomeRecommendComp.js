import React from "react";
import "./HomeRecommendComp.less"
class HomeRecommendComp extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            length: 0,
            index: 1,
            point_key: 0,
            startX: 0,
            disX: 0,
            elementX: 0,
            carousel_width: 0,
            scrollNow: false,
            needTransition: true,
        }
    }

    recommend_touchStart_fn = (e) => {
        this.setState({
            needTransition: false,
            startX: e.changedTouches[0].clientX,
            disX: 0,
        })

        if (this.state.index === 0) {
            this.setState({
                needTransition: false,
                index: this.state.length - 2,
                elementX: -(this.state.length - 2) * this.state.carousel_width,
            })
        }

        if (this.state.index === this.state.length - 1) {
            this.setState({
                needTransition: false,
                index: 1,
                elementX: -1 * this.state.carousel_width,
            })
        }

    }

    recommend_touchMove_fn = (e) => {
        this.setState({
            scrollNow: true,
            disX: e.changedTouches[0].clientX - this.state.startX,
        })
    }

    recommend_touchEnd_fn = (e) => {
        this.setState({
            needTransition: true,
        })
        //如果滑动距离大于宽度的5分之1并且是从左往右滑动，
        if (Math.abs(this.state.disX) > this.state.carousel_width / 5 && this.state.disX > 0) {
            this.setState({
                index: this.state.index - 1,
                point_key: this.state.point_key - 1 < 0 ? this.state.length - 3 : this.state.point_key - 1,
                scrollNow: false,
                elementX: -(this.state.index - 1) * this.state.carousel_width,
            })

        }
        //如果滑动距离大于宽度的5分之1并且是从右往左滑动，
        else if (Math.abs(this.state.disX) > this.state.carousel_width / 5 && this.state.disX < 0) {
            this.setState({
                index: this.state.index + 1,
                point_key: this.state.point_key + 1 > this.state.length - 3 ? 0 : this.state.point_key + 1,
                scrollNow: false,
                elementX: -(this.state.index + 1) * this.state.carousel_width,
            })


        }
        //如果滑动距离没大于5分之1，那就回到原来位置
        else if (Math.abs(this.state.disX) <= this.state.carousel_width / 5) {
            this.setState({
                scrollNow: false,
                elementX: -this.state.index * this.state.carousel_width,
            })
        }
    }



    componentDidMount() {
        this.setState({
            elementX: -document.documentElement.offsetWidth,
            carousel_width: document.documentElement.offsetWidth,
            length: this.props.recommend.length,
        })
    }
    
    render(){
        // console.log(this.state.point_key)
        // console.log(this.state.index)
        // console.log(this.state.elementX)
        return (
            <div className="home_content_recommend">
                <div className="home_recommend_top clearfix">
                    <div className="home_recommend_top_left">
                        <h2>每日推荐~早餐</h2>
                    </div>
                    <div className="home_recommend_top_right">
                        <a href="javascript:;">查看更多</a>
                    </div>
                </div>
                <div className="home_recommend_bottom">
                    <div className="recommend_carousel_wrap" onTouchStart={this.recommend_touchStart_fn} onTouchMove={this.recommend_touchMove_fn} onTouchEnd={this.recommend_touchEnd_fn}>
                        <ul className="recommend_carousel clearfix" style={{ transform: this.state.scrollNow ? "translateX(" + (this.state.elementX + this.state.disX) + "px)" : "translateX(" + (-(this.state.index) * this.state.carousel_width) + "px)", transition: this.state.needTransition ? "transform .3s" : 'transform 0s' }}>
                            {
                                this.props.recommend.map((item, index) => {
                                    return (
                                        <li className="clearfix" key={index}>
                                            <div className="recommend_carousel_left">
                                                <div className="carousel_img">
                                                    <a href={item.left_link}>
                                                        <img src={item.left_img} alt="" />
                                                    </a>
                                                </div>
                                                <h3>{item.left_title}</h3>
                                                <div className="author_info">
                                                    <img src={item.left_authorImg} alt="" />
                                                    <span>{item.left_authorName}</span>
                                                </div>
                                            </div>
                                            <div className="recommend_carousel_right">
                                                <div className="carousel_img">
                                                    <a href={item.right_link}>
                                                        <img src={item.right_img} alt="" />
                                                    </a>
                                                </div>
                                                <h3>{item.right_title}</h3>
                                                <div className="author_info">
                                                    <img src={item.right_authorImg} alt="" />
                                                    <span>{item.right_authorName}</span>
                                                </div>
                                            </div>


                                        </li>
                                    )
                                })
                            }



                        </ul>
                        <div className="recommend_points_wrap">
                            {
                                this.props.recommend.map((item, index) => {

                                    if (index <= this.props.recommend.length - 3) {
                                        return (
                                            <span key={index} className={this.state.point_key === index ? 'carousel_active' : ''}></span>
                                        )
                                    }

                                })
                            }
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
export default HomeRecommendComp