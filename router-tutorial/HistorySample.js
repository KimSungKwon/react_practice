import React, { Component } from 'react';

class HistorySample extends Component {
    // 뒤로가기
    handleGoBack = () => {
        this.props.history.goBack();
    };
    //홈으로 이동
    handleGoHome = () => {
        this.props.history.push('/');
    };

    componentDidMount() {   // 페이지에 변화가 생길때 마다 정말 나갈건지 질문
        this.unblock = this.props.history.block('정말 떠날건가요');
    }

    coomponentWillUnmount() {
        if(this.unblock) {
            this.unblock();
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleGoBack}>뒤로</button>
                <button onClick={this.handleGoHome}>홈으로</button>
            </div>
        );
    }
}

export default HistorySample;