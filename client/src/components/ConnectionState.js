import React from 'react';

export function ConnectionState({ isConnected }) {
  return <p>State: { 'We' + isConnected }</p>;
}