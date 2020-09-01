import React from 'react';
import { withRouter } from 'react-router-dom';
import WithRouterSample from './WithRouterSample';

const data = {
    velopert: {
        name: '김민준',
        descriptioin: '개발자'
    },
    gildong: {
        name: '홍길동',
        descriptioin: '소설주인공'
    }
};

const Profile = ({ match }) => {    // match: 객체
    const { username } = match.params;
    const profile = data[username];
    if (!profile) {
        return <div>존재하지 않는 계정입니다</div>;
    }
    return (
        <div>
            <h3>
                {username}({profile.name})
            </h3>
            <p>{profile.descriptioin}</p>

            <WithRouterSample />
        </div>
    );
};

export default withRouter(Profile);