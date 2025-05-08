
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/UI/card'
import { Button } from '@/features/UI/button'
import { AlertCircle, Brain, Calendar, Lightbulb, LineChart, TrendingDown, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Progress } from '@/features/UI/progress'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const PredictiveAccounting = () => {
  // Sample cash flow forecast data
  const cashFlowData = [
    { name: 'May', inflow: 48500, outflow: 42000, balance: 6500 },
    { name: 'Jun', inflow: 52000, outflow: 43500, balance: 8500 },
    { name: 'Jul', inflow: 58000, outflow: 45000, balance: 13000 },
    { name: 'Aug', inflow: 55500, outflow: 46500, balance: 9000 },
    { name: 'Sep', inflow: 54000, outflow: 47000, balance: 7000 },
    { name: 'Oct', inflow: 56500, outflow: 48500, balance: 8000 },
    { name: 'Nov', inflow: 62000, outflow: 49000, balance: 13000 },
  ]

  // Sample inventory financing data
  const inventoryAlerts = [
    {
      id: 1,
      supplier: 'PharmaDirect',
      earlyPayment: '2% discount',
      orderTotal: '$8,450',
      deadline: 'May 5, 2025',
      savingsAmount: '$169',
    },
    {
      id: 2,
      supplier: 'MediSupply Co.',
      earlyPayment: '1.5% discount',
      orderTotal: '$12,750',
      deadline: 'May 12, 2025',
      savingsAmount: '$191',
    },
  ]

  // Sample expiring products data
  const expiringProductsData = [
    { name: 'Amoxicillin', risk: 85 },
    { name: 'Insulin', risk: 65 },
    { name: 'Cetirizine', risk: 45 },
    { name: 'Ibuprofen', risk: 25 },
    { name: 'Lisinopril', risk: 10 },
  ]

  const Input = ({ className, ...props }: InputProps) => {
    return (
      <input
        className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-tight">AI-Powered Predictions</h3>
          <p className="text-sm text-muted-foreground">Make data-driven financial decisions</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Brain className="h-4 w-4 mr-2" />
          Generate Insights
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="h-5 w-5 mr-2" />
              Cash Flow Forecasting
            </CardTitle>
            <CardDescription>6-month financial projection based on historical data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashFlowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="inflow"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Cash In"
                  />
                  <Area
                    type="monotone"
                    dataKey="outflow"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Cash Out"
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#ffc658"
                    fill="#ffc658"
                    name="Net Cash"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="border rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Projected Revenue</p>
                <div className="flex items-center justify-center space-x-1">
                  <p className="text-lg font-bold">$386,000</p>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Projected Expenses</p>
                <div className="flex items-center justify-center space-x-1">
                  <p className="text-lg font-bold">$321,500</p>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Net Profit (Forecast)</p>
                <div className="flex items-center justify-center">
                  <p className="text-lg font-bold text-green-600">$64,500</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Financial Insights
            </CardTitle>
            <CardDescription>AI-generated recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Cash Flow Alert</p>
                    <p className="text-sm text-muted-foreground">
                      Cash reserves projected to increase by 18% in the next quarter based on seasonal trends.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                      View Cash Flow Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-3 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-start space-x-2">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Tax Payment Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Quarterly estimated tax payment of $5,420 due in 12 days.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-green-600 text-sm">
                      Set Up Payment
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-3 bg-amber-50 dark:bg-amber-900/20">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Insurance Claims Alert</p>
                    <p className="text-sm text-muted-foreground">
                      Aetna claims showing 12% higher rejection rate this month. Verify claim formatting.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-amber-600 text-sm">
                      Review Claims
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <Brain className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Ask AI Assistant</p>
                    <p className="text-sm text-muted-foreground">Get answers to your financial questions</p>
                    <div className="mt-2 flex">
                      <Input className="text-xs rounded-r-none" placeholder="Ask about financial metrics..." />
                      <Button className="rounded-l-none">Ask</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-green-600" />
              Inventory Financing Alerts
            </CardTitle>
            <CardDescription>Early payment discount opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border rounded-md p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{alert.supplier}</p>
                      <p className="text-xs text-muted-foreground">Order total: {alert.orderTotal}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Save {alert.savingsAmount}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs">{alert.earlyPayment}</p>
                      <p className="text-xs text-muted-foreground">Pay by: {alert.deadline}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              Breakage Prediction
            </CardTitle>
            <CardDescription>Products likely to expire before sale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringProductsData.map((product) => (
                <div key={product.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{product.name}</span>
                    <span
                      className={`${
                        product.risk > 70
                          ? 'text-red-500'
                          : product.risk > 40
                            ? 'text-amber-500'
                            : 'text-green-500'
                      }`}
                    >
                      {product.risk}% risk
                    </span>
                  </div>
                  <Progress value={product.risk} className="h-2" />
                </div>
              ))}

              <Button variant="outline" className="w-full text-sm">
                View All At-Risk Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
} from "recharts";
import { Progress } from "@/components/ui/progress";

export const PredictiveAccounting = () => {
  // Sample cash flow forecast data
  const cashFlowData = [
    { name: "May", inflow: 48500, outflow: 42000, balance: 6500 },
    { name: "Jun", inflow: 52000, outflow: 43500, balance: 8500 },
    { name: "Jul", inflow: 58000, outflow: 45000, balance: 13000 },
    { name: "Aug", inflow: 55500, outflow: 46500, balance: 9000 },
    { name: "Sep", inflow: 54000, outflow: 47000, balance: 7000 },
    { name: "Oct", inflow: 56500, outflow: 48500, balance: 8000 },
    { name: "Nov", inflow: 62000, outflow: 49000, balance: 13000 },
  ];
  
  // Sample inventory financing data
  const inventoryAlerts = [
    { id: 1, supplier: "PharmaDirect", earlyPayment: "2% discount", orderTotal: "$8,450", deadline: "May 5, 2025", savingsAmount: "$169" },
    { id: 2, supplier: "MediSupply Co.", earlyPayment: "1.5% discount", orderTotal: "$12,750", deadline: "May 12, 2025", savingsAmount: "$191" }
  ];
  
  // Sample expiring products data
  const expiringProductsData = [
    { name: "Amoxicillin", risk: 85 },
    { name: "Insulin", risk: 65 },
    { name: "Cetirizine", risk: 45 },
    { name: "Ibuprofen", risk: 25 },
    { name: "Lisinopril", risk: 10 }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold tracking-tight">AI-Powered Predictions</h3>
          <p className="text-sm text-muted-foreground">Make data-driven financial decisions</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Brain className="h-4 w-4 mr-2" />
          Generate Insights
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="h-5 w-5 mr-2" />
              Cash Flow Forecasting
            </CardTitle>
            <CardDescription>
              6-month financial projection based on historical data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={cashFlowData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Area type="monotone" dataKey="inflow" stackId="1" stroke="#8884d8" fill="#8884d8" name="Cash In" />
                  <Area type="monotone" dataKey="outflow" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Cash Out" />
                  <Area type="monotone" dataKey="balance" stroke="#ffc658" fill="#ffc658" name="Net Cash" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="border rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Projected Revenue</p>
                <div className="flex items-center justify-center space-x-1">
                  <p className="text-lg font-bold">$386,000</p>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Projected Expenses</p>
                <div className="flex items-center justify-center space-x-1">
                  <p className="text-lg font-bold">$321,500</p>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Net Profit (Forecast)</p>
                <div className="flex items-center justify-center">
                  <p className="text-lg font-bold text-green-600">$64,500</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Financial Insights
            </CardTitle>
            <CardDescription>
              AI-generated recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Cash Flow Alert</p>
                    <p className="text-sm text-muted-foreground">Cash reserves projected to increase by 18% in the next quarter based on seasonal trends.</p>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">View Cash Flow Details</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-3 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-start space-x-2">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Tax Payment Reminder</p>
                    <p className="text-sm text-muted-foreground">Quarterly estimated tax payment of $5,420 due in 12 days.</p>
                    <Button variant="link" className="p-0 h-auto text-green-600 text-sm">Set Up Payment</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-3 bg-amber-50 dark:bg-amber-900/20">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Insurance Claims Alert</p>
                    <p className="text-sm text-muted-foreground">Aetna claims showing 12% higher rejection rate this month. Verify claim formatting.</p>
                    <Button variant="link" className="p-0 h-auto text-amber-600 text-sm">Review Claims</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <Brain className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Ask AI Assistant</p>
                    <p className="text-sm text-muted-foreground">Get answers to your financial questions</p>
                    <div className="mt-2 flex">
                      <Input className="text-xs rounded-r-none" placeholder="Ask about financial metrics..." />
                      <Button className="rounded-l-none">Ask</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-green-600" />
              Inventory Financing Alerts
            </CardTitle>
            <CardDescription>
              Early payment discount opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryAlerts.map(alert => (
                <div key={alert.id} className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{alert.supplier}</p>
                      <p className="text-xs text-muted-foreground">Order total: {alert.orderTotal}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Save {alert.savingsAmount}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs">{alert.earlyPayment}</p>
                      <p className="text-xs text-muted-foreground">Pay by: {alert.deadline}</p>
                    </div>
                    <Button variant="outline" size="sm">Pay Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              Breakage Prediction
            </CardTitle>
            <CardDescription>
              Products likely to expire before sale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringProductsData.map(product => (
                <div key={product.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{product.name}</span>
                    <span className={`${
                      product.risk > 70 ? 'text-red-500' : 
                      product.risk > 40 ? 'text-amber-500' : 'text-green-500'
                    }`}>
                      {product.risk}% risk
                    </span>
                  </div>
                  <Progress value={product.risk} className="h-2" />
                </div>
              ))}
              
              <Button variant="outline" className="w-full text-sm">
                View All At-Risk Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};
