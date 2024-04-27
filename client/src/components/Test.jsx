import React from 'react'

const Test = () => {
  return (
      <div className="">
          <div className="">
              <section>
                  <nav style=''>
                      <ul>
                          
                      <li><a href='/'>Home</a></li>
                      {/* <li><a href='#'><%= link_to "Upload", new_post_path %></a></li> */}
                      {/* <li><a href='#'><%= link_to "My Media", pages_media_path %></a></li> */}
                      {/* <li><a href='#'><%= link_to "Profile", curent_user %></a></li> */}
                      <li>
                          {/* <%= button_to("Log Out". destroy_user_session_path, method :delete) %> */}
                      </li>
                      {/* <% else %> */}
                      <li>
                          <a href="#">
                            {/* <%= link_to "Sign up", new_user_registration_path %> */}
                          </a>
                      </li>
                      </ul>
                      {/* <% end %> */}
                  </nav>
                    {/* <!-- Header Icons --> */}
              </section>
              {/* <!-- Responsive Icons --> */}
            {/* <%= render "layouts/search_bar"%> */}
          </div>
    </div>
  )
}

export default Test
