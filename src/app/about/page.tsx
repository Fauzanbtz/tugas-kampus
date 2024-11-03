import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";

export default function Component() {
  return (
    <div className="w-full font-serif">
      <Navbar />
      <section className="bg-primary text-white py-12 md:py-24 ">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto grid gap-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
            <p className="text-lg md:text-xl text-gray-400">
              We are an e-commerce company committed to providing a great online
              shopping experience for our customers. With a vision to become the
              leading platform in this industry, we continue to innovate and
              develop solutions to make your life easier.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Vision</h2>
              <p className="text-gray-400">
                To become a trusted e-commerce platform providing quality
                products and the best services for our customers.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Mission</h2>
              <p className="text-gray-400">
                We are committed to continuous innovation, expanding our reach,
                and providing an enjoyable online shopping experience for
                everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid gap-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">Our Team</h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                We are a group of professionals dedicated to providing the best
                for our customers.
              </p>
            </div>
            <div className="flex flex-wrap justify-around">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                  <AvatarFallback>
                    <Image
                      src="https://i.pinimg.com/736x/30/98/f2/3098f2d8ba66fe67b46d4558b98882ab.jpg"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Fauzan</h3>
                  <p className="text-muted-foreground">CEO</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-user.jpg" alt="Jane Smith" />
                  <AvatarFallback>
                    <Image
                      src="https://i.pinimg.com/564x/6b/0b/3b/6b0b3b273446db32253cc0b259ffe4aa.jpg"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Arkhan</h3>
                  <p className="text-muted-foreground">Staff</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Michael Johnson"
                  />
                  <AvatarFallback>
                    <Image
                      src="https://i.pinimg.com/564x/e7/32/8d/e7328dda453fab5ce0047ff67d0f9937.jpg"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Khanif</h3>
                  <p className="text-muted-foreground">Assistant</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Michael Johnson"
                  />
                  <AvatarFallback>
                    <Image
                      src="https://i.pinimg.com/564x/5c/3b/1e/5c3b1efd6254eef86fa89116edec4c64.jpg"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Tami</h3>
                  <p className="text-muted-foreground">Supplier</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Michael Johnson"
                  />
                  <AvatarFallback>
                    <Image
                      src="https://i.pinimg.com/564x/07/12/43/0712433a8806c63e1574606bcae263c3.jpg"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Abay</h3>
                  <p className="text-muted-foreground">Staff</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt="Michael Johnson"
                  />
                  <AvatarFallback>
                    <Image
                      src="https://i.pinimg.com/564x/46/6b/c2/466bc236c0ec8163db8df0e7d21e0359.jpg"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">Niko</h3>
                  <p className="text-muted-foreground">Staff</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-300 py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto grid gap-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">
              Our Business Process
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              We have an efficient and transparent business process to provide
              an exceptional shopping experience for our customers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Ordering</h3>
              <p className="text-muted-foreground">
                Customers can easily place orders through our user-friendly
                platform. We ensure a fast and secure ordering process.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Shipping</h3>
              <p className="text-muted-foreground">
                We collaborate with trusted logistics partners to ensure quick
                and safe delivery across the country.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Customer Service</h3>
              <p className="text-muted-foreground">
                Our experienced team is ready to assist you whenever you need
                it. We are committed to providing excellent service.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Returns</h3>
              <p className="text-muted-foreground">
                We understand that sometimes products may not meet expectations.
                Therefore, we offer a quick and easy return process.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto grid gap-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground text-lg md:text-xl">
              Our values are the foundation of every decision and action we
              take.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Integrity</h3>
              <p className="text-muted-foreground">
                We are committed to being honest, ethical, and transparent in
                every interaction with our customers.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously innovate to develop better solutions and deliver
                a more enjoyable shopping experience.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Customer Satisfaction</h3>
              <p className="text-muted-foreground">
                Customer satisfaction is our top priority. We strive to meet
                their needs and exceed their expectations.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Social Responsibility</h3>
              <p className="text-muted-foreground">
                We are committed to conducting our business in a socially and
                environmentally responsible manner.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
