export const H1 = ({ children }) => (
  <h1>
    {children}
    <style jsx>
      {`
        h1 {
          font-weight: 200;
          font-size: 32px;
        }
      `}
    </style>
  </h1>
)

const B = ({ children }) => (
  <span>
    {children}
    <style jsx>
      {`
        span {
          font-weight: 400;
        }
      `}
    </style>
  </span>
)

H1.B = B

export const H2 = ({ children }) => (
  <h2>
    {children}
    <style jsx>
      {`
        h2 {
          font-weight: normal;
          font-size: 24px;
        }
      `}
    </style>
  </h2>
)

export const H3 = ({ children }) => (
  <h3>
    {children}
    <style jsx>
      {`
        h3 {
          font-weight: bold;
          font-size: 18px;
        }
      `}
    </style>
  </h3>
)

export const H4 = ({ children, isCommand }) => (
  <h4 className={isCommand ? 'command' : ''}>
    {children}
    <style jsx>
      {`
        h3 {
          font-weight: bold;
          font-size: 16px;
        }

        .command {
          color: #bd10e0;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 0.9em;
        }
      `}
    </style>
  </h4>
)

export const H5 = ({ children }) => (
  <h5>
    {children}
    <style jsx>
      {`
        h5 {
          font-weight: bold;
          font-size: 15px;
        }
      `}
    </style>
  </h5>
)
