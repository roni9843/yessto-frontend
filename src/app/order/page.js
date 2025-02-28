"use client";

// // Custom Step Icon
// const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
//   color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
//   display: "flex",
//   height: 22,
//   alignItems: "center",
//   ...(ownerState.active && {
//     color: "#784af4",
//   }),
//   "& .QontoStepIcon-completedIcon": {
//     color: "#784af4",
//     zIndex: 1,
//     fontSize: 18,
//   },
//   "& .QontoStepIcon-circle": {
//     width: 8,
//     height: 8,
//     borderRadius: "50%",
//     backgroundColor: "currentColor",
//   },
// }));

// function QontoStepIcon(props) {
//   const { active, completed, className } = props;

//   return (
//     <QontoStepIconRoot ownerState={{ active }} className={className}>
//       {completed ? (
//         <Check className="QontoStepIcon-completedIcon" />
//       ) : (
//         <div className="QontoStepIcon-circle" />
//       )}
//     </QontoStepIconRoot>
//   );
// }

// QontoStepIcon.propTypes = {
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   completed: PropTypes.bool,
// };

// // Colorlib Step Connector styles
// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor:
//       theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
//     borderRadius: 1,
//   },
// }));

// // Colorlib Step Icon
// const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
//   zIndex: 1,
//   color: "#fff",
//   width: 50,
//   height: 50,
//   display: "flex",
//   borderRadius: "50%",
//   justifyContent: "center",
//   alignItems: "center",
//   ...(ownerState.active && {
//     backgroundImage:
//       "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
//     boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
//   }),
//   ...(ownerState.completed && {
//     backgroundImage:
//       "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
//   }),
// }));

// function ColorlibStepIcon(props) {
//   const { active, completed, className } = props;

//   const icons = {
//     1: <SettingsIcon />,
//     2: <GroupAddIcon />,
//     3: <VideoLabelIcon />,
//   };

//   return (
//     <ColorlibStepIconRoot
//       ownerState={{ completed, active }}
//       className={className}
//     >
//       {icons[String(props.icon)]}
//     </ColorlibStepIconRoot>
//   );
// }

// ColorlibStepIcon.propTypes = {
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   completed: PropTypes.bool,
//   icon: PropTypes.node,
// };

const steps = ["Pending", "Processing", "Shipped", "Delivered"];

const OrderPage = () => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const { orderId } = router.query;

  // const userInfo = useSelector((state) => state.users.userInfo);

  // const [activeStep, setActiveStep] = useState(0);
  // const [order, setOrder] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       if (orderId) {
  //         const response = await axios.get(
  //           `https://elec-ecommerce-back.vercel.app/orders/${orderId}`
  //         );
  //         setOrder(response.data);
  //         const stepIndex = steps.indexOf(response.data.status);
  //         setActiveStep(stepIndex !== -1 ? stepIndex : 0); // Default to 0 if status not found
  //       }
  //     } catch (error) {
  //       console.error("Error fetching order:", error);
  //       setError(
  //         "There was an issue fetching your order. Please try again later."
  //       );
  //     }
  //   };

  //   fetchOrder();
  // }, [orderId]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
      nemo tempora quae quam voluptates perferendis voluptatum rem, velit quod
      dolorum sed fugit sint. Fuga suscipit placeat mollitia id eius atque
      fugiat hic dignissimos libero quisquam odio beatae quibusdam sunt at autem
      consequatur animi, consequuntur neque nisi! Harum voluptatibus nulla amet
      rem, quo corporis voluptatum et quam quia ipsa neque provident mollitia
      dolore assumenda ullam quisquam omnis maxime consectetur deleniti? Omnis
      aliquam nam fugit sint repudiandae consequuntur excepturi placeat
      explicabo mollitia aliquid, esse tempore laudantium itaque rem blanditiis
      maxime ex aut nostrum dignissimos temporibus culpa autem? Culpa provident
      error earum libero praesentium. Numquam magnam possimus fugit ullam. Quo
      assumenda non ullam est alias, id perferendis magnam! Dolorem, corporis
      quibusdam commodi inventore totam beatae dolores sequi. Quam amet libero
      provident accusamus facilis, maiores ducimus, ipsa molestias facere rem
      non ad ipsam magnam porro suscipit sit nihil debitis nemo sequi iure quod
      reprehenderit? Dignissimos, maxime cum aspernatur minus quos maiores,
      commodi temporibus tempora quaerat esse eum minima explicabo,
      exercitationem itaque. Reprehenderit eaque impedit, ratione eligendi fugit
      dolore veritatis iure odio voluptatem sed facilis quis nisi ipsa magni
      numquam voluptatum itaque beatae aliquam, architecto aspernatur! Ab
      provident nemo corporis nisi suscipit voluptatem iste at!
    </div>
  );
};

export default OrderPage;
