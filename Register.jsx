import { Button, Carousel, Form, Input, message } from "antd"
import { Link } from "react-router-dom"
import AuthCarousel from "../../components/auth/AuthCarousel"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                });
            if(res.status === 200) {
                message.success("Registered Successfully!");
                navigate("/login");
                setLoading(false);
            }
        }
        catch (error) {
            message.error("Something went wrong!");
            console.log(error);

        }
    }

    return (
        <div className="h-screen">
            <div className="flex justify-between h-full">
                <div className="xl:px-20 px-10 w-full flex flex-col justify-center relative">
                    <h1 className="text-center text-5xl font-bold mb-2">POS APP</h1>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item label="Username" name={"username"}
                            rules={[
                                {
                                    required: true,
                                    message: "Username field cannot be blank!"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Email address cannot be blank!"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: "Password field cannot be blank!"
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Confirm Password" name={"confirmpassword"} dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Re-type your password!"
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="w-full mt-2" size="large" loading={loading}>Register</Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">Do you have an Account?&nbsp; <Link to="/login" className="text-blue-600">Login now</Link></div>
                </div>
                <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff]">
                    <div className="w-full h-full flex items-center">
                        <div className="w-full">
                            <Carousel className="!h-full px-6" autoplay>
                                <AuthCarousel img="/images/responsive.svg" title="Responsive" desc="Responsive with all devices." />
                                <AuthCarousel img="/images/statistic.svg" title="Statistics" desc="Widely shown statistics." />
                                <AuthCarousel img="/images/customer.svg" title="Customer Satisfaction" desc="Customers who are satisfied with the product at the end of the experience." />
                                <AuthCarousel img="/images/admin.svg" title="Admin Panel" desc="Management from one place." />
                            </Carousel>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register