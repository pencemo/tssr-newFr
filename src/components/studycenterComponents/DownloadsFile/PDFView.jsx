import React from "react";
import image from "../../../assets/PdfHead.png";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontSize: 10,
    padding: 10,
  },
  section: {
    margin: 10,
    marginTop: 20,
    // padding: 10,
    // border: '1px solid #000',
  },
  haeaImg: {
    padding: 10,
  },
  headSection: {
    display: "flex",
    flexDirection: "row",
    padding: 2,
  },
  headText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#000",
    padding: 0,
  },
  header: {
    marginBottom: 10,
    textAlign: "center",
  },
  organizationName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  organizationDetails: {
    fontSize: 8,
    marginBottom: 5,
  },
  centerInfo: {
    marginBottom: 15,
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    padding: "5px 0",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    margin: "10px 0",
  },
  table: {
    width: "100%",
    border: "1px solid #000",
    borderBottom: "none",
    // borderRight: 'none',
    // margin: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  tableColHeader: {
    width: "100%",
    borderRight: "1px solid #000",
    padding: 5,
    fontWeight: "600",
    backgroundColor: "#f0f0f0",
    fontSize: 8,
    textAlign: "center",
  },
  tableColHeaderMark: {
    width: "100%",
    borderRight: "1px solid #000",
    padding: 5,
    fontWeight: "500",
    fontSize: 8,
    textAlign: "center",
  },
  tableCol: {
    width: "100%",
    borderRight: "1px solid #000",
    padding: 5,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
});

// Create Document Component
const PDFView = ({ data, head, name, mark }) => {
  const width = Math.round(60 / head.length);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* header */}
        <View style={styles.section}>
          <Image style={styles.haeaImg} src={image} />
        </View>
        <View style={{ margin: 10 , border: '1px solid #000', padding: 10, borderRadius: 5}}>
          <View style={styles.headSection}>
            <Text style={{ ...styles.headText, width: "100px" }}>
              Centre Name :
            </Text>
            <Text
              style={{ ...styles.headText, fontWeight: "600", marginBottom: 4 }}
            >
              {data.studycenterName}
            </Text>
          </View>
          <View style={styles.headSection}>
            <Text style={{ ...styles.headText, width: "100px" }}>
              Course Name :
            </Text>
            <Text
              style={{ ...styles.headText, fontWeight: "600", marginBottom: 4 }}
            >
              {data.courseName}
            </Text>
          </View>
          <View style={styles.headSection}>
            <Text style={{ ...styles.headText, width: "100px" }}>Batch :</Text>
            <Text
              style={{ ...styles.headText, fontWeight: "600", marginBottom: 4 }}
            >
              {data?.batchMonth}, {data.year}
            </Text>
          </View>
          {/* <View
            style={{
              width: "100%",
              marginTop: 5,
              borderBottom: "0.5px solid #000",
            }}
          ></View> */}
        </View>
        <View
          style={{
            margin: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700" }}>{name}</Text>
        </View>

        <View style={{ width: "100%", padding: 10 }}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableColHeader, width: "5%" }}>
                <Text>No</Text>
              </View>
              <View style={{ ...styles.tableColHeader, width: "15%" }}>
                <Text>Reg No</Text>
              </View>
              <View style={{ ...styles.tableColHeader, width: "20%" }}>
                <Text>Name</Text>
              </View>
              {head.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{ ...styles.tableColHeader, width: `${width}%`, borderRight: `${index === head.length - 1 ? "none" : "1px solid #000"}`}}
                  >
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>

            {mark && mark?.length &&
             <View style={styles.tableRow}>
             <View style={{ ...styles.tableColHeaderMark, width: "5%" }}>
               <Text></Text>
             </View>
             <View style={{ ...styles.tableColHeaderMark, width: "15%" }}>
               <Text></Text>
             </View>
             <View style={{ ...styles.tableColHeaderMark, width: "20%" }}>
               <Text></Text>
             </View>
             {mark?.map((item, index) => {
               return (
                 <View
                   key={index}
                   style={{ ...styles.tableColHeaderMark, width: `${width}%`, borderRight: `${index === head.length - 1 ? "none" : "1px solid #000"}`}}
                 >
                   <Text>{item}</Text>
                 </View>
               );
             })}
           </View>
            }
             <View style={styles.tableRow}>
             <View style={{ ...styles.tableColHeaderMark, width: "5%" }}>
               <Text>Date</Text>
             </View>
             <View style={{ ...styles.tableColHeaderMark, width: "15%" }}>
               <Text></Text>
             </View>
             <View style={{ ...styles.tableColHeaderMark, width: "20%" }}>
               <Text></Text>
             </View>
           </View>

            {/* Table Rows */}
            {data?.data.map((student, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={{ ...styles.tableCol, width: "5%" }}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: "15%" }}>
                  <Text>{student.registrationNumber}</Text>
                </View>
                <View style={{ ...styles.tableCol, width: "20%" }}>
                  <Text>{student.name}</Text>
                </View>
                
                {head.map((_item, index) => {
                  return (
                    <View
                      key={index}
                      style={{ ...styles.tableCol, width: `${width}%`, borderRight: `${index === head.length - 1 ? "none" : "1px solid #000"}` }}
                    >
                      <Text></Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFView;
