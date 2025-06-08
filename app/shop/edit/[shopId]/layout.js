export default function ShopsLayout({ children }) {
    return (
        <div style={{ display:'grid',
            gridTemplateAreas:`"editshop products"
            `,
             gridTemplateColumns:'1fr 1fr',
             height:'100vh',
             overflowY:'scroll'
         }}>
           
            {children} {/* Renders the nested pages inside /shops */}
        </div>
    );
}