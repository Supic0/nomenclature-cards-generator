import React, { useEffect } from 'react';
import { Page, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';


export default function DownloadButton({ listOfCards }) {

    useEffect(() => {
        console.log(MyDocument());


    }, [])


    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#00000000'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        }
    });

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {listOfCards.map((card, index) =>
                            <Image key={index} src={card.vignette} style={{width:"6cm", height:"9cm", margin: "0.15cm"}}/>
                    )}
                </View>
            </Page>
        </Document>
    );

    return (
        <PDFDownloadLink document={<MyDocument />} fileName="MesCartes.pdf">
            {({ blob, url, loading, error }) => (loading ? 'préparation...' : 'Télécharger')}
        </PDFDownloadLink>

    )
}



