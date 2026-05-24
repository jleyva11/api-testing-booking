import http from 'k6/http';
import { check, sleep } from 'k6';

// DATA-DRIVEN (arrays simulando CSV)
const clients = [10, 12, 13, 14, 15];
const rooms = [10, 12, 13, 14, 15];

// CONFIGURACIÓN
export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<1'],
  },
};

export default function () {

  // DATA DINÁMICA
  let payload = JSON.stringify({
    client_id: clients[Math.floor(Math.random() * clients.length)],
    room_id: rooms[Math.floor(Math.random() * rooms.length)],
    start_date: "2026-06-01",
    end_date: "2026-06-05"
  });

  let params = {
    headers: { 'Content-Type': 'application/json' },

    // TAGS
    tags: {
      name: 'CreateBooking',
      endpoint: '/bookings'
    }
  };

  let res = http.post('http://127.0.0.1:8000/v1/bookings/', payload, params);

  // TESTS 
  check(res, {

    
    'status correcto o esperado': (r) => [201, 409, 422].includes(r.status),

    'response has id': (r) => r.body.includes('id'),

    'has client_id': (r) => r.body.includes('client_id'),

    'has room_id': (r) => r.body.includes('room_id'),

    'has start_date': (r) => r.body.includes('start_date'),

    'no error': (r) => !r.body.includes('error'),

    'response time < 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}


import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}
