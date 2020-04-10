<template>
   <!-- <div>
      <b-navbar toggleable="lg" type="dark" variant="success">
        <b-container>
            <b-navbar-brand  href="#"><img src="~@/assets/img/lg.png"></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
               <b-navbar-nav >
               <b-nav-item href="#">首页</b-nav-item>
               <b-nav-item href="#" disabled>导航</b-nav-item>
             </b-navbar-nav>
              <b-navbar-nav align="end">
                <b-nav-form>
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Search for a meal" v-model="meal"></b-form-input>
                  <b-button size="sm"  class="my-2 my-sm-0" type="submit" @click.prevent="getMeal">Search</b-button>
                </b-nav-form>
                <b-nav-item-dropdown right>
             
                  <template slot="button-content"><em>User</em></template>
                  <b-dropdown-item href="#">Profile</b-dropdown-item>
                  <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-container>
      </b-navbar>
    </div> -->
    <div>
  <b-navbar toggleable="md"  class=''>
    <b-navbar-brand href="#"><img src="~@/assets/img/lg.png"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" class="bg-success"></b-navbar-toggle>

    <b-collapse id="nav-collapse"  is-nav>
      <b-navbar-nav align="start">
        <b-nav-item href="#" >首页</b-nav-item>
        <b-nav-item href="#" disabled>导航</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="m-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0 ml-0" type="submit"><img src="~@/assets/img/search.png"/></b-button>
        </b-nav-form>

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <!-- <b-nav-item-dropdown right>

          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>-->
      </b-navbar-nav>
      <b-navbar-nav>
        <div class="input-group">
             <div class="col-4 ml-auto  font-weight-bold "><div class="header_bt"><a href="" style="color:#159963">立即登录</a></div></div>
             <div class="col-4 mr-auto font-weight-bold "><div class="header_bt header_bt_register" ><a href="" class="a_white">免费注册</a></div></div>
        </div>     </b-navbar-nav>
      
    </b-collapse>
  </b-navbar>
</div>
</template>
