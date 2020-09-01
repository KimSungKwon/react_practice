import React from 'react';
import qs from 'qs';

const About = ({ location }) => {
    const query = qs.parse(location.search, {   // parse: JSON문자열 -> JSON오브젝트
        ignoreQueryPrefix: true // 문자열 맨앞의 ? 생략
    });
    const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열
    return (
        <div>
            <h1>소개</h1>
            <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트</p>
            {showDetail && <p>detail 값을 true로 설정하였음</p>}   {/* detail값이 true면 <p> 생성 */}
        </div>
    );
};

export default About;