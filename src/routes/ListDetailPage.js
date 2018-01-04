import React from "react";
import SingleListView from "../compnents/ListView/SingleListView";
import {connect} from "react-redux";




//详细列表页面
@connect(
    state => ({countRecords: state.countRecords})
)
class ListDetailPage extends React.Component {
    componentDidMount() {
        // this.props.history.push("/detail/days");
    }

    render() {
        console.log("匹配", this.props.match.params.id);
        let id = this.props.match.params.id;
        let title = '123213';
        let records;
        switch (id) {
            case 'days':
                // console.log(this.props.countRecords.dayRecords);
                records = this.props.countRecords.dayRecords;
                title = '日消费记录';
                break;
            case 'week':
                // console.log(this.props.countRecords.weekRecords);
                records = this.props.countRecords.weekRecords;
                title = '周消费记录';
                break;
            case 'month':
                // console.log(this.props.countRecords.monthRecords);
                records = this.props.countRecords.monthRecords;
                title = '月消费记录';
                break;

        }
        return (
            <SingleListView records={records} title={title}/>
        )
    }
};

export default ListDetailPage;