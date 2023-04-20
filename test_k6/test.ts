import http from 'k6/http';

// default test
// export const options = {
//     insecureSkipTLSVerify: true,
//     noConnectionReuse: false,
//     vus: 1,
//     duration: '10s'
// };

// stress test
export const options = {
    scenarios: {
        stress: {
            executor: "ramping-arrival-rate",
            preAllocatedVUs: 500,
            timeUnit: "1s",
            stages: [
                { duration: "30s", target: 100 }, // below normal load
                { duration: "1m", target: 100 },
                { duration: "30s", target: 200 }, // normal load
                { duration: "1m", target: 200 },
                { duration: "30s", target: 300 }, // around the breaking point
                { duration: "1m", target: 300 },
                { duration: "30s", target: 400 }, // beyond the breaking point
                { duration: "1m", target: 400 },
                { duration: "2m", target: 0 }, // scale down. Recovery stage.
            ],
        },
    },
};

// spike test
// export const options = {
//     scenarios: {
//         spike: {
//             executor: "ramping-arrival-rate",
//             preAllocatedVUs: 1000,
//             timeUnit: "1s",
//             stages: [
//                 { duration: "10s", target: 100 }, // below normal load
//                 { duration: "1m", target: 100 },
//                 { duration: "10s", target: 1400 }, // spike to 140 iterations
//                 { duration: "3m", target: 1400 }, // stay at 140 for 3 minutes
//                 { duration: "10s", target: 100 }, // scale down. Recovery stage.
//                 { duration: "3m", target: 100 },
//                 { duration: "10s", target: 0 },
//             ],
//             gracefulStop: "2m",
//         },
//     },
// };

// load test
// export const options = {
//     stages: [
//         { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
//         { duration: '5m', target: 100 }, // stay at 100 users for 10 minutes
//         { duration: '1m', target: 0 }, // ramp-down to 0 users
//     ],
//     thresholds: {
//         'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
//     },
// };

export default () => {
    http.get('http://localhost:8080/api/v1/');
}