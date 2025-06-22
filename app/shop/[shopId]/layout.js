export default function ShopsLayout({ children }) {
    return (
        <div style={{ display:'grid',
            gridTemplateAreas:`"shop products products"
            `,
             gridTemplateColumns:'1fr 1fr 1fr',
             height:'auto',
             gap:'1rem'
         }}>
           
            {children} {/* Renders the nested pages inside /shops */}
        </div>
    );
}