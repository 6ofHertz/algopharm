<motion.div
  className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
  initial="hidden"
  animate="visible"
  variants={containerVariants}
>
  <motion.div variants={itemVariants}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$1,284.39</div>
        <p className="text-xs text-muted-foreground">+18.1% from yesterday</p>
      </CardContent>
    </Card>
  </motion.div>

  <motion.div variants={itemVariants}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Transactions</CardTitle>
        <Receipt className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">24</div>
        <p className="text-xs text-muted-foreground">Today's completed transactions</p>
      </CardContent>
    </Card>
  </motion.div>

  <motion.div variants={itemVariants}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Customers</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">19</div>
        <p className="text-xs text-muted-foreground">4 new customers today</p>
      </CardContent>
    </Card>
  </motion.div>

  <motion.div variants={itemVariants}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">7</div>
        <p className="text-xs text-muted-foreground">Awaiting pickup</p>
      </CardContent>
    </Card>
  </motion.div>
</motion.div>
