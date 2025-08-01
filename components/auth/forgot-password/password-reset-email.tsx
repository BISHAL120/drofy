interface PasswordResetEmailProps {
  code: string;
  userEmail: string;
  companyName: string;
  supportEmail: string;
  expiryMinutes?: number;
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    border?: string;
  };
}

export default function PasswordResetEmail({
  code,
  userEmail,
  companyName,
  supportEmail,
  expiryMinutes = 10,
  theme = {
    primary: "#2c3e50",
    secondary: "#007bff",
    background: "#f8f9fa",
    text: "#333333",
    border: "#e9ecef",
  },
}: PasswordResetEmailProps) {
  const styles = {
    container: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      lineHeight: "1.6",
      color: theme.text,
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
    },
    header: {
      backgroundColor: theme.background,
      padding: "40px 20px",
      textAlign: "center" as const,
      borderBottom: `1px solid ${theme.border}`,
    },
    title: {
      margin: "0",
      fontSize: "28px",
      fontWeight: "bold",
      color: theme.primary,
    },
    mainContent: {
      padding: "40px 20px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: "20px",
      textAlign: "center" as const,
    },
    paragraph: {
      fontSize: "16px",
      marginBottom: "20px",
      textAlign: "center" as const,
    },
    codeContainer: {
      textAlign: "center" as const,
      margin: "40px 0",
    },
    code: {
      display: "inline-block",
      backgroundColor: theme.background,
      border: `2px solid ${theme.border}`,
      borderRadius: "8px",
      padding: "20px 30px",
      fontSize: "32px",
      fontWeight: "bold",
      letterSpacing: "8px",
      color: theme.primary,
      fontFamily: 'Monaco, Consolas, "Lucida Console", monospace',
    },
    instructionsBox: {
      backgroundColor: theme.background,
      border: `1px solid ${theme.border}`,
      borderRadius: "6px",
      padding: "20px",
      marginBottom: "30px",
    },
    securityNotice: {
      backgroundColor: "#fff3cd",
      border: "1px solid #ffeaa7",
      borderRadius: "6px",
      padding: "15px",
      marginBottom: "30px",
    },
    footer: {
      backgroundColor: theme.background,
      padding: "20px",
      textAlign: "center" as const,
      borderTop: `1px solid ${theme.border}`,
    },
    link: {
      color: theme.secondary,
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{companyName}</h1>
      </div>

      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Reset Your Password</h2>

        <p style={styles.paragraph}>
          Hi there! We received a request to reset the password for your account
          associated with {userEmail}.
        </p>

        <p style={styles.paragraph}>
          Use the verification code below to reset your password:
        </p>

        <div style={styles.codeContainer}>
          <div style={styles.code}>{code}</div>
        </div>

        <p style={{ ...styles.paragraph, fontSize: "14px", color: "#6c757d" }}>
          This code will expire in {expiryMinutes} minutes for security reasons.
        </p>

        <div style={styles.instructionsBox}>
          <h3
            style={{
              ...styles.heading,
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            How to use this code:
          </h3>
          <ol
            style={{
              fontSize: "14px",
              color: "#495057",
              paddingLeft: "20px",
              margin: "0",
            }}
          >
            <li style={{ marginBottom: "5px" }}>
              Go back to the password reset page or click{" "}
              <a
                href={`${process.env.NEXT_PUBLIC_URL}/new-password?userEmail=${userEmail}`}
                style={styles.link}
              >
                here
              </a>
            </li>
            <li style={{ marginBottom: "5px" }}>
              Enter the 6-digit code above
            </li>
            <li style={{ marginBottom: "5px" }}>Create your new password</li>
            <li>{"You'll be logged in automatically"}</li>
          </ol>
        </div>

        <div style={styles.securityNotice}>
          <p
            style={{
              fontSize: "14px",
              color: "#856404",
              margin: "0",
              fontWeight: "500",
            }}
          >
            <strong>Security Notice:</strong> If you didn&lsquo;t request a
            password reset, please ignore this email or contact our support team
            immediately.
          </p>
        </div>

        <p style={{ ...styles.paragraph, fontSize: "14px", color: "#6c757d" }}>
          Need help? Contact us at{" "}
          <a href={`mailto:${supportEmail}`} style={styles.link}>
            {supportEmail}
          </a>
        </p>
      </div>

      <div style={styles.footer}>
        <p style={{ fontSize: "12px", color: "#6c757d", margin: "0" }}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
        <p style={{ fontSize: "12px", color: "#6c757d", margin: "5px 0 0 0" }}>
          This is an automated message, please do not reply to this email.
        </p>
      </div>
    </div>
  );
}
