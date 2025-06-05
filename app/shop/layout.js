export default function ShopsLayout({ children }) {
    return (
        <div style={{ //display:'grid',
            // gridTemplateAreas:`"header main"
            // `,
            // gridTemplateColumns:'1fr 3fr',
            // background:'red',
            // height:'100vh',
            // overflowY:'scroll'
         }}>
            {/* <h1 style={{gridArea:'header'}}>Shops Section</h1> */}
            {children} {/* Renders the nested pages inside /shops */}
        </div>
    );
}